# REGISTER/SIGNUP ROUTE
from flask import make_response
from flask_restful import request, Resource
from models.users import User
from app_setup import db
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies
)

class Signup(Resource):
    def post(self):
        try:
            req = request.get_json()
            if User.query.filter(User.email == req['email']).first():
                return {'error': 'Email already exists.'}, 400
            
            user = User(
                first_name=req['first_name'],
                last_name=req['last_name'],
                zipcode=req['zipcode'],
                email=req['email']
            )
            user.password_hash = req['password']
            db.session.add(user)
            db.session.commit()
            jwt = create_access_token(identity=user.id)
            refresh_token = create_refresh_token(identity=user.id)
            user_data = user.to_dict()
            user_data['accessToken'] = jwt
            user_data['refreshToken'] = refresh_token
            response = make_response(user_data, 201)
            set_access_cookies(response, jwt)
            set_refresh_cookies(response, refresh_token)
            return response
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400