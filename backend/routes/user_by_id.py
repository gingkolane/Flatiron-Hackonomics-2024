from app_setup import db
from flask import make_response
from flask_restful import request, Resource
from models.users import User
from app_setup import db
from flask_jwt_extended import (
    unset_access_cookies,
    unset_refresh_cookies,
)