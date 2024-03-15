# Standard library imports

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token, set_access_cookies
from datetime import timedelta
import os

# Local imports

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.config['SQLALCHEMY_ECHO'] = True
app.secret_key = os.environ.get('APP_SECRET')
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
app.config["PROPAGATE_EXCEPTIONS"] = True
app.config['CLIENT_ID'] = os.environ.get('G_CLIENT_ID')
app.config["JWT_COOKIE_SECURE"] = True
app.config['JWT_TOKEN_LOCATION'] = ["headers", "cookies", "json", "query_string"]
# CHANGE TO 15 MINUTES WHEN READY (Short time for testing)
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=5)
# CHANGE TO 3 DAYS WHEN READY (Short time for testing)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(minutes=5)
app.config['JWT_COOKIE_CSRF_PROTECT'] = True

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"})
#! flask-sqlalchemy setup
db = SQLAlchemy(app)
#! flask-migrate setup
migrate = Migrate(app, db)
#! flask-bcrypt
bcrypt = Bcrypt(app)
#! flask-restful setup
api = Api(app)
#! flask-jwt-extended setup
jwt = JWTManager(app)
