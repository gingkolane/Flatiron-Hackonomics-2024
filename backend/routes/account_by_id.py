from app_setup import db
from flask import make_response
from flask_restful import request, Resource
from models.accounts import Account

class AccountById(Resource):
    def patch(self, user_id, account_id):
        pass

    def delete(self, user_id, account_id):
        user_account = Account.query.filter(Account.user_id == user_id, Account.id == account_id).first()
        return user_account.to_dict()