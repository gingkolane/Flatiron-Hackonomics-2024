# IMPORT STATEMENTS
from .. import make_response, request, session, Resource # Imported from __init__.py
# Uncomment line below once user model is committed and get rid of this line
# from models.users import User
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
                pass
            return {'error': 'Invalid email or password'}, 403
        except Exception as e:
            return {'error': 'Invalid credentials'}, 403