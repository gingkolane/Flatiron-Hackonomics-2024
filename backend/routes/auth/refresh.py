from app_setup import Resource, make_response, db, jwt_required, get_jwt_identity, create_access_token, set_access_cookies
from models.users import User

class Refresh(Resource):
    def post(self):
        pass