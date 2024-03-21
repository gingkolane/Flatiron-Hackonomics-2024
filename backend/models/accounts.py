from app_setup import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class Account(db.Model, SerializerMixin):
    __tablename__ = 'accounts'

    serialize_rules = ('-user.accounts',
                       '-transactions.account')

    id = db.Column(db.String(150), primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    balance = db.Column(db.Float, nullable=False)
    type = db.Column(db.String(50), nullable=False)
    limit = db.Column(db.Float)
    currency = db.Column(db.String(3), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates='accounts')
    transactions = db.relationship('Transaction', back_populates='account')

    @validates('name')
    def validate_name(self, key, name):
        if not isinstance(name, str):
            raise TypeError('Name of the bank must be a string')
        elif len(name) < 1 or len(name) > 50:
            raise ValueError('Name of bank account must be between 1 and 50 characters')
        return name

    @validates('balance')
    def validate_balance(self, key, balance):
        if not isinstance(balance, float):
            raise TypeError('Balance must be a float')
        return balance

    @validates('type')
    def validate_type(self, key, type):
        if not isinstance(type, str):
            raise TypeError('Type of bank account must be a string')
        elif len(type) < 1 or len(type) > 50:
            raise ValueError('Type of bank account must be between 1 and 50 characters')
        return type

    @validates('limit')
    def validate_limit(self, key, limit):
        if not isinstance(limit, float):
            raise TypeError('Limit must be a float')
        return limit
    
    @validates('currency')
    def validate_currency(self, key, currency):
        if not isinstance(currency, str):
            raise TypeError('Currency must be a string')
        elif len(currency) < 1 or len(currency) > 3:
            raise ValueError('Currency must be between 1 and 3 characters')
        return currency

from models.transactions import Transaction