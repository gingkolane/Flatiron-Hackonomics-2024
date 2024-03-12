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
        pass