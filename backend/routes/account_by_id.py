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

    # Post a new account using user id
    def post(self, id):
        try:
            # Get user input data
            data = request.get_json()
            # Create new account
            new_account = Account(
                name = data['name'],
                balance = data['balance'],
                type = data['type'],
                limit = data.get('limit', 0.0),
                currency = data['currency'],
                user_id = id,
            )
            db.session.add(new_account)
            db.session.commit()
            response = make_response(new_account.to_dict(), 201)
            return response
        except Exception as e:
            db.session.rollback()
            return {'error': f'Could not create new account, {str(e)}'}, 400

    def patch(self, id):
        pass

    def delete(self, account_id, user_id):
        pass