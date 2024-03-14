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
from routes.auth.register import Register