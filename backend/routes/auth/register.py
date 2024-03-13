# REGISTER/SIGNUP ROUTE
from .. import make_response, request, session, Resource
from flask import jsonify
from models.users import User
from app_setup import db
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies
)

class Register(Resource):
    def post(self):
        user_data = {
            'first_name': request.json.get('first_name'),
            'last_name': request.json.get('last_name'),
            'email': request.json.get('email')
        }
        if (user_data.get('first_name')) and (user_data.get('last_name')) and (user_data.get('email')):
            if (User.query.filter_by(email=user_data.get('email')).first()):
                return {'error': 'Email already exists'}, 409 
            else:
                try:
                    new_user = User(first_name=user_data.get('first_name'), last_name=user_data.get('last_name'), email=user_data.get('email'))
                    new_user.password_hash = request.json.get('password')
                    db.session.add(new_user)
                    db.session.commit()
                    
                except Exception as e:
                    db.session.rollback()
                    return {'error': 'Could not validate information'}, 400
        else:
            return {'error': 'The server was unable to retrieve your information'}, 400
