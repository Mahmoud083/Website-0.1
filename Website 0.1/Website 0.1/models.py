from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy() # create instance of SQLAlchemy class

class User(UserMixin, db.Model):
    __tablename__ = 'users' # table name
    id = db.Column(db.Integer, primary_key=True) # primary key
    username = db.Column(db.String(80), unique=True, nullable=False) # unique username
    password_hash = db.Column(db.String(128), nullable=False) # hashed password

    def set_password(self, password): # set password
        self.password_hash = generate_password_hash(password) # hash password

    def check_password(self, password):
        return check_password_hash(self.password_hash, password) # check hashed password

    def __repr__(self):
        return f'<User {self.username}>'
