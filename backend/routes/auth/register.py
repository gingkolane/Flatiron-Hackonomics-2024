from flask import make_response, request, jsonify
from flask_restful import Resource
from models.users import User
from app_setup import db
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token
)

class Register(Resource):
    def post(self):
        data = request.get_json()

        if not all(key in data for key in ['first_name', 'last_name', 'email', 'password']):
            return {'error': 'Missing required information'}, 400

        if User.query.filter_by(email=data['email']).first():
            return {'error': 'Email already exists'}, 409

        try:
            new_user = User(
                first_name=data['first_name'],
                last_name=data['last_name'],
                email=data['email']
            )
            # Use the setter method to hash the password and perform validations
            new_user.password_hash = data['password']

            db.session.add(new_user)
            db.session.commit()

            jwt = create_access_token(identity=new_user.id)
            refresh_token = create_refresh_token(identity=new_user.id)

            response_data = {
                'user': {
                    'first_name': new_user.first_name,
                    'last_name': new_user.last_name,
                    'email': new_user.email,
                },
                'accessToken': jwt,
                'refreshToken': refresh_token
            }

            return {'Success': response_data}, 201
        except Exception as e:
            db.session.rollback()
            return {'error': f'Error during registration: {str(e)}'}, 400
