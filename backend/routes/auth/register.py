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
        if (email := request.json.get('email')) and (password := request.json.get('password')):
            if (User.query.filter_by(email=email).first()):
                return {'error': 'Email already exists'}, 409 
            else:
                try:
                    pass
                except Exception as e:
                    db.session.rollback()
                    return {'error': 'Could not validate information'}, 400
        else:
            return {'error': 'The server was unable to retrieve your information'}, 400
