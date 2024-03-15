#!/usr/bin/env python3

# Local imports
from app_setup import app, db, api, jwt

# Remote library imports
from flask_restful import Resource

# Model imports
from models.users import User

# Route imports
#! Authentication
from routes.auth.login import Login
from routes.auth.logout import Logout
from routes.auth.register import Register
from routes.auth.current_user import CurrentUser
from routes.auth.refresh import Refresh


# Resources
#! Authentication
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Register, '/register')
api.add_resource(CurrentUser, '/currentuser')
api.add_resource(Refresh, '/refresh')


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
    return '<h1>Project Server</h1>'

if __name__ == '__main__':
    app.run(port=5555, debug=True)