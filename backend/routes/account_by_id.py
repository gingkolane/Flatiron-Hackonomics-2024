from app_setup import db
from flask import make_response
from flask_restful import request, Resource
from models.accounts import Account

class AccountById(Resource):
    # Get specific account using user id (int) and account id (string)
    def get(self, user_id, account_id):
        user_account = Account.query.filter(Account.user_id == user_id, Account.id == account_id).first()
        return user_account.to_dict(rules=('-transactions', '-user'))

    # Update bank account information using user id (int) and account id (string)
    def patch(self, user_id, account_id):
        user_account = Account.query.filter(Account.user_id == user_id, Account.id == account_id).first()
        try:
            req = request.get_json()
            for attr in req:
                setattr(user_account, attr, req[attr])
            db.session.commit()
            return user_account.to_dict(rules=('-transactions', '-user'))
        except Exception as e:
            return {'error': f'Could not update bank account, {str(e)}'}, 400

    # Delete Specific bank account using user id (int) and account id (string)
    def delete(self, user_id, account_id):
        user_account = Account.query.filter(Account.user_id == user_id, Account.id == account_id).first()
        try:
            db.session.delete(user_account)
            db.session.commit()
            return {'message': 'Bank account has been deleted'}, 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400