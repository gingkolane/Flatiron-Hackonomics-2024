from flask_restful import Resource
from app_setup import db
from models.users import User
from flask_restful import Resource
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)

class CurrentUser(Resource):
    @jwt_required()
    def get(self):
        try:
            if (current_user := db.session.get(User, get_jwt_identity())):
                return current_user.to_dict(), 200
            else:
                return {'error': 'Could not find a user with that id'}, 401
        except Exception as e:
            return {'error': str(e)}, 401