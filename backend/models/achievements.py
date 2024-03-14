from app_setup import db
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from users import User

class Achievement(db.Model, SerializerMixin):
    __tablename__ = "achievements"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    description = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # Relationships
    user = db.relationship("User", back_populates="achievements")

    # Validations
    @validates("name")
    def title_validation(self, _, value):
        if not isinstance(value, str):
            raise TypeError("Name must be a string.")
        elif len(value) < 3 or len(value) > 50:
            raise ValueError("Name must be between 3 and 50 characters")
        return value
    
    #NOT SURE IF WE ARE USING SESSION BASED AUTH
    @validates("user_id")
    def user_id_validation(self, _, user_id):
        if not user_id and db.session.get(User, user_id):
            raise Exception("User id must be a valid user")
        return user_id

    @validates("description")
    def category_validation(self, _, value):
        if not isinstance(value, str):
            raise TypeError("Description must be a string.")
        elif len(value) < 3 or len(value) > 50:
            raise ValueError("Description must be between 3 and 50 characters")
        return value
