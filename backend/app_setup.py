# Standard library imports

# Remote library imports
from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
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
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)
jwt = JWTManager(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)

cors = CORS(
    app,
    supports_credentials=True,
    resources={
        r"/register": {"origins": "exp://10.0.0.31:8081"},
    },
)
bcrypt = Bcrypt(app)
 