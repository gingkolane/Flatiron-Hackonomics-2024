from app_setup import db
from flask import make_response
from flask_restful import request, Resource
from models.accounts import Account

class AccountById(Resource):
    def get(self, user_id):
        pass

    def post(self, user_id):
        pass

    def patch(self, id):
        pass

    def delete(self, account_id, user_id):
        pass