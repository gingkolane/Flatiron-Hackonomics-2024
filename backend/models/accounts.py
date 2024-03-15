from sqlalchemy_serializer import SerializerMixin

from app_setup import db


class Account(db.Model, SerializerMixin):
    __tablename__ = 'accounts'

    id = db.Column(db.Integer, primary_key=True)
    bank_name = db.Column(db.String(50), nullable=False)
    account_number = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # user = db.relationship('User', back_populates='accounts')
    expenses = db.relationship('Expense', back_populates='account')