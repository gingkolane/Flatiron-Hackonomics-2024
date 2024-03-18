# IMPORT STATEMENTS
from flask import make_response
from flask_restful import request, Resource
from models.users import User
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies
)

class Login(Resource):
    def post(self):
        try:
            # Get user input data (email/username, password)
            req = request.get_json()
            # Query database by user email
            user = User.query.filter(User.email == req['email']).first()
            # Check if user exists and authenticate
            if user and user.authenticate(req['password']):
                # Create an access token for the user using id
                jwt = create_access_token(identity=user.id)
                # Manually set refresh token
                refresh_token = create_refresh_token(identity=user.id)
                # Prepackage the response using data
                user_data = user.to_dict() if hasattr(user, 'to_dict') else {}  # Ensure user has a to_dict method or handle accordingly
                user_data['accessToken'] = jwt
                user_data['refreshToken'] = refresh_token
                response = make_response(user_data, 200)
                # Set both cookies on the response- will be sent along with every request until unset
                set_access_cookies(response, jwt)
                set_refresh_cookies(response, refresh_token)
                return response
            return {'error': 'Invalid email or password'}, 403
        except Exception as e:
            return {'error': e}, 403