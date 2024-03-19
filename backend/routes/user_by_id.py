from app_setup import db
from flask import make_response
from flask_restful import request, Resource
from models.users import User
from app_setup import db
from flask_jwt_extended import (
    unset_access_cookies,
    unset_refresh_cookies,
)

class UserById(Resource):
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
            return {'error': f'Update unsuccessful, {str(e)}'}, 400

    def delete(self, id):
        user = User.query.get_or_404(
            id, description=f"Could not find user {id}"
        )
        try: 
            pass
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400