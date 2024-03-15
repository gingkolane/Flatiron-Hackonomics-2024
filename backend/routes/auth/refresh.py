from app_setup import Resource, make_response, db, jwt_required, get_jwt_identity, create_access_token, set_access_cookies
from models.users import User

class Refresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_id = get_jwt_identity()
        response = make_response(db.session.get(User, current_id).to_dict(), 200)
        access_token = create_access_token(identity=current_id)
        set_access_cookies(response, access_token)

        return response