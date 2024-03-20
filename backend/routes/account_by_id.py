from app_setup import db
from flask import make_response
from flask_restful import request, Resource
from models.accounts import Account

class AccountById(Resource):
    # Get all accounts by user id
    def get(self, id):
        # Query all accounts and filter by user id
        user_accounts = Account.query.filter(Account.user_id == id).all()
        accounts_list = []
        # Serialize each account object into JSON
        for account in user_accounts:
            accounts_list.append(account.to_dict(rules=('-transactions',)))
        response = make_response(accounts_list, 200)
        return response

    def post(self, user_id):
        pass

    def patch(self, id):
        pass

    def delete(self, account_id, user_id):
        pass