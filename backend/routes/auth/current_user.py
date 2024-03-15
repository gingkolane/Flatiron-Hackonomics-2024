from .. import Resource, db, jwt_required, get_jwt_identity
from models.users import User

class CurrentUser(Resource):
    @jwt_required()
    def get(self):
        try:
            pass
        except Exception as e:
            return {'error': str(e)}