from flask import make_response
from flask_restful import Resource
from models.users import User
from app_setup import db
from flask_jwt_extended import (
    unset_access_cookies,
    unset_refresh_cookies,
)

class Logout(Resource):
    def delete(self):
        response = make_response({}, 204)
        unset_access_cookies(response)
        unset_refresh_cookies(response)
        return response