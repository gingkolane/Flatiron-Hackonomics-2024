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

from models.transactions import Transaction