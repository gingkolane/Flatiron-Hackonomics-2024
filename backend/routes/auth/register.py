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
        # Checks if first_name, last_name, and email are inputted
        if (first_name := request.json.get('first_name')) and (last_name := request.json.get('last_name')) and (email := request.json.get('email')):
            # Initialize an object with user input
            user_data = {
                'first_name': first_name,
                'last_name': last_name,
                'email': email
            }
            # Check if user email already exists in db
            if (User.query.filter_by(email=user_data.get('email')).first()):
                return {'error': 'Email already exists'}, 409 
            else:
                try:
                    # Initialize new User using necessary information
                    new_user = User(first_name=user_data.get('first_name'), last_name=user_data.get('last_name'), email=user_data.get('email'))
                    # Hash password
                    new_user.password_hash = request.json.get('password')
                    # Add user to db session
                    db.session.add(new_user)
                    db.session.commit()
                    # Start JWT and set refresh token
                    jwt = create_access_token(identity=new_user.id)
                    refresh_token = create_refresh_token(identity=new_user.id)
                    # Prepackage response
                    response = make_response(new_user, 201)
                    # Set access and refresh cookies on the response - will be sent with every request until unset
                    set_access_cookies(response, jwt)
                    set_refresh_cookies(response, refresh_token)
                    return response
                except Exception as e:
                    db.session.rollback()
                    return {'error': 'Could not validate information'}, 400
        else:
            return {'error': 'The server was unable to retrieve your information'}, 400
