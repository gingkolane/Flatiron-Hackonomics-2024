#!/usr/bin/env python3

# Local imports
from app_setup import app, db, api, jwt
from jwt.exceptions import DecodeError

# Remote library imports
# from flask_restful import Resource

# Model imports
from models.users import User

# Route imports
# Authentication Routes
from routes.auth.signup import Signup
from routes.auth.login import Login
from routes.auth.logout import Logout
from routes.auth.current_user import CurrentUser
from routes.auth.refresh import Refresh
# General Routes
from routes.user_by_id import UserById
from routes.account_by_id import AccountById

# Resources
api.add_resource(Signup, '/api/signup', endpoint='/api/auth')
api.add_resource(Login, '/api/login', endpoint='/api/login')
api.add_resource(Logout, '/api/logout', endpoint='/api/logout')
api.add_resource(CurrentUser, '/api/currentuser', endpoint='/api/currentuser')
api.add_resource(Refresh, '/api/refresh', endpoint='/api/refresh')
api.add_resource(UserById, '/api/users/<int:id>')
api.add_resource(AccountById, '/api/users/<int:id>/accounts')


# Register a callback function that loads a user from your database whenever 
# a protected route is accessed. This should return any python object on a 
# successful lookup, or None if the lookup failed for any reason
# (For ex: if a user has been deleted from the database)
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data['sub']
    return db.session.get(User, identity)

@app.route('/')
def index():
    return 

if __name__ == '__main__':
    app.run(port=5555, debug=True)