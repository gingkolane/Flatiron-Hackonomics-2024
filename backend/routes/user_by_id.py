from app_setup import db
from flask import make_response
from flask_restful import request, Resource
from flask_jwt_extended import (
    unset_access_cookies,
    unset_refresh_cookies,
)

class UserById(Resource):
    # Get a user by id (Not sure if we will use this but I thought I would add it)
    def get(self, id):
        user = User.query.get_or_404(
            id, description=f"Could not find user {id}"
        )
        try:
            user_data = user.to_dict()
            return user_data, 200
        except Exception as e:
            return {'error': f'Could not find the user, {str(e)}'}, 404

    # Update a user's information by id
    def patch(self, id):
        user = User.query.get_or_404(
            id, description=f"Could not find user {id}"
        )
        try:
            req = request.get_json()
            for attr in req:
                setattr(user, attr, req[attr])
            db.session.add(user)
            db.session.commit()
            user_data = user.to_dict()
            response = make_response(user_data, 200)
            return response
        except Exception as e:
            db.session.rollback()
            return {'error': f'Update unsuccessful, {str(e)}'}, 400

    # Delete a user by id
    def delete(self, id):
        user = User.query.get_or_404(
            id, description=f"Could not find user {id}"
        )
        try: 
            db.session.delete(user)
            db.session.commit()
            response = make_response({}, 204)
            unset_access_cookies(response)
            unset_refresh_cookies(response)
            return {'message': f'Your account has been deleted'}, 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400
        
from models.users import User