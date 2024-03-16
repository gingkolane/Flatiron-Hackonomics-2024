from app_setup import db
from sqlalchemy_serializer import SerializerMixin

class Account(db.Model, SerializerMixin):
    __tablename__ = 'accounts'

    id = db.Column(db.String(150), primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    balance = db.Column(db.Float, nullable=False)
    type = db.Column(db.String(50), nullable=False)
    limit = db.Column(db.Float)
    currency = db.Column(db.String(3), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates='accounts')
    transactions = db.relationship('Transaction', back_populates='account')
    
    from models.transactions import Transaction
