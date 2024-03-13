# REGISTER/SIGNUP ROUTE
from .. import make_response, request, session, Resource
from flask import jsonify
from app_setup import db
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies
)

class Register(Resource):
    def post(self):
        pass
