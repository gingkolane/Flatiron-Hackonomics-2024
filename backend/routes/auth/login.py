# IMPORT STATEMENTS
from .. import make_response, request, session, Resource # Imported from __init__.py
from models.users import User
from app_setup import db
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
            data = request.json
            # Query database by user email
            user = User.query.filter_by(email=data.get('email')).first()
            # Check if user exists and authenticate
            if user and user.authenticate(data.get('password')):
                # Create an access token for the user using id
                jwt = create_access_token(identity=user.id)
                # access_token = create_access_token(identity=user.id)

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
            return {'error': 'Invalid credentials'}, 403