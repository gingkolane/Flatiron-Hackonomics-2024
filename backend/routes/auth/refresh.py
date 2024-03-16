from flask_restful import Resource
from app_setup import db
from flask import make_response
from models.users import User
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
    create_access_token,
    set_access_cookies
)


class Refresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        try:
            current_id = get_jwt_identity()
            response = make_response(db.session.get(User, current_id).to_dict(), 200)
            access_token = create_access_token(identity=current_id)
            set_access_cookies(response, access_token)

            return response
        except Exception as e:
            return {'error': str(e)}, 500