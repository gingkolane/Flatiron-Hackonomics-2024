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
        if (first_name := request.json.get('first_name')) and (last_name := request.json.get('last_name')) and (email := request.json.get('email')):
            user_data = {
                'first_name': first_name,
                'last_name': last_name,
                'email': email
            }
            if (User.query.filter_by(email=user_data.get('email')).first()):
                return {'error': 'Email already exists'}, 409 
            else:
                try:
                    new_user = User(first_name=user_data.get('first_name'), last_name=user_data.get('last_name'), email=user_data.get('email'))
                    new_user.password_hash = request.json.get('password')
                    db.session.add(new_user)
                    db.session.commit()

                    jwt = create_access_token(identity=new_user.id)
                    refresh_token = create_refresh_token(identity=new_user.id)
                    response = make_response(new_user, 201)

                    set_access_cookies(response, jwt)
                    set_refresh_cookies(response, refresh_token)

                    return response
                except Exception as e:
                    db.session.rollback()
                    return {'error': 'Could not validate information'}, 400
        else:
            return {'error': 'The server was unable to retrieve your information'}, 400
