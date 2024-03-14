from app_setup import db
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from users import User
from accounts import Account

class Expenses(db.Model, SerializerMixin):
    __tablename__ = "expenses"

    id = db.Column(db.Integer, primary_key=True)
    transaction_date = db.Column(db.DateTime, server_default=db.func.now())
    name = db.Column(db.String, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    account_id = db.Column(db.Integer, db.ForeignKey("accounts.id"))
    completed = db.Column(db.Boolean, nullable=False, server_default=False)
    recurring = db.Column(db.Boolean, nullable=False, server_default=False)

    # Relationships
    user = db.relationship("User", back_populates="expenses")
    account = db.relationship("Account", back_populates="expenses")

    # Validations
    @validates("name")
    def title_validation(self, _, value):
        if not isinstance(value, str):
            raise TypeError("Name must be a string.")
        elif len(value) < 3 or len(value) > 50:
            raise ValueError("Name must be between 3 and 50 characters")
        return value
    
    @validates("amount")
    def title_validation(self, _, value):
        if not isinstance(value, float):
            raise TypeError("Value must be a floating point number.")
        return value
    
    @validates("category")
    def title_validation(self, _, value):
        if not isinstance(value, str):
            raise TypeError("Category must be a string.")
        elif len(value) < 3 or len(value) > 20:
            raise ValueError("Category must be between 3 and 20 characters")
        return value
    
    #NOT SURE IF WE ARE USING SESSION BASED AUTH
    @validates("user_id")
    def user_id_validation(self, _, user_id):
        if not user_id and db.session.get(User, user_id):
            raise Exception("User id must be a valid user")
        return user_id
    
    @validates("account_id")
    def user_id_validation(self, _, user_id):
        if not user_id and db.session.get(Account, user_id):
            raise Exception("Account does not exist")
        return user_id 