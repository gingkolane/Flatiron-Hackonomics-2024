import re
from app_setup import bcrypt, db
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin



class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    accounts = db.relationship('Account', back_populates='user', cascade='all, delete-orphan')
    # achievements = db.relationship('Achievement', back_populates='user', cascade='all, delete-orphan')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        if len(password) < 8:
            raise ValueError('Password must be at least 8 characters long')
        if not re.search('[A-Z]', password):
            raise ValueError('Password must contain at least one uppercase letter')
        if not re.search('[a-z]', password):
            raise ValueError('Password must contain at least one lowercase letter')
        if not re.search('[0-9]', password):
            raise ValueError('Password must contain at least one digit')
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
        
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    @validates('email')
    def validate_email(self, key, email):
        existing_user = User.query.filter(User.email == email).first()
        if existing_user and existing_user.id != self.id:
            raise ValueError('Email address already registered')
        if not email:
            raise ValueError("Please provide an email address")
        if '@' not in email:
            raise ValueError("Please provide an email address")
        return email
    
    @validates('first_name')
    def validate_first_name(self, key, first_name):
        if not first_name:
            raise ValueError("Please provide a first name")
        return first_name
    
    @validates('last_name')
    def validate_last_name(self, key, last_name):
        if not last_name:
            raise ValueError("Please provide a last name")
        return last_name
    