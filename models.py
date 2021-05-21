from enum import unique
from flask_sqlalchemy import SQLAlchemy 
from flask_bcrypt import Bcrypt
from flask_login import UserMixin
from datetime import datetime

bcrypt = Bcrypt()

db = SQLAlchemy()

def connect_db(app):
    '''Connect to datbase'''
    db.app = app
    db.init_app(app)

# *********************** USER MODELS *********************** 

class User(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column (db.Integer, primary_key = True, autoincrement = True)
    first_name = db.Column(db.String(30), nullable = False)
    last_name = db.Column(db.String(30), nullable = False)
    email = db.Column(db.Text, nullable = False)
    username = db.Column(db.String(20), nullable = False, unique = True)
    password = db.Column(db.Text, nullable = False)

    projects = db.relationship('Project', cascade = 'all, delete' )

  

    @classmethod
    def register(cls, first_name, last_name, email, username, password):
        """Register user w/hashed password & return user."""

        hashed = bcrypt.generate_password_hash(password)
        hashed_utf8 = hashed.decode("utf8")

        # return instance of user w/username and hashed pwd
        return cls( first_name=first_name, last_name=last_name, email=email, username=username, password=hashed_utf8)

  
    @classmethod
    def authenticate(cls, username, password):
        """Validate that user exists & password is correct.

        Return user if valid; else return False.
        """

        user = User.query.filter_by(username=username).first()

        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return False

# *********************** PROJECT MODELS *********************** 


class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column (db.Integer, primary_key = True, autoincrement = True)
    cip_id = db.Column (db.Text, unique = True)
    name = db.Column (db.Text, nullable = False)
    description = db.Column (db.Text, nullable = True)
    budget = db.Column(db.Integer, nullable = True)
    owner = db.Column(db.Integer, db.ForeignKey('users.id'))


    rfis = db.relationship('RFI', cascade = 'all, delete')
    submittals = db.relationship('Submittal', cascade = 'all, delete')
    change_orders = db.relationship('ChangeOrder', cascade = 'all, delete')
    inspection_reports = db.relationship('InspectionReport', cascade = 'all, delete')
    

class RFI(db.Model):
    __tablename__ = 'rfis'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)   
    number = db.Column(db.Float, nullable = False)
    title = db.Column (db.Text, nullable = False)
    description = db.Column (db.Text, nullable = True)
    author = db.Column (db.String(30), nullable = False)
    company = db.Column (db.String(30), nullable = False)
    due_date = db.Column(db.Date, nullable = False)
    status = db.Column (db.String(30), nullable = False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated = db.Column(db.DateTime, onupdate=datetime.utcnow)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))

    def serialize(self):
        
        return {
            'id': self.id,
            'number': self.number,
            'title': self.title,
            'description': self.description,
            'author': self.author,
            'company': self.company,
            'due_date': self.due_date,
            'status': self.status,
            'created': self.created,
            'updated': self.updated,
            'project_id': self.project_id,
        }


class Submittal(db.Model):
    __tablename__ = 'submittals'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)   
    number = db.Column(db.Float, nullable = False)
    title = db.Column (db.Text, nullable = False)
    description = db.Column (db.Text, nullable = True)
    author = db.Column (db.String(30), nullable = False)
    company = db.Column (db.String(30), nullable = False)
    due_date = db.Column(db.Date, nullable = False)
    status = db.Column (db.String(30), nullable = False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated = db.Column(db.DateTime, onupdate=datetime.utcnow)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))

    def serialize(self):
        
        return {
            'id': self.id,
            'number': self.number,
            'title': self.title,
            'description': self.description,
            'author': self.author,
            'company': self.company,
            'due_date': self.due_date,
            'status': self.status,
            'created': self.created,
            'updated': self.updated,
            'project_id': self.project_id,
        }

class ChangeOrder(db.Model):
    __tablename__ = 'change_orders'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)   
    number = db.Column(db.Float, nullable = False)
    title = db.Column (db.Text, nullable = False)
    description = db.Column (db.Text, nullable = True)
    author = db.Column (db.String(30), nullable = False)
    company = db.Column (db.String(30), nullable = False)
    status = db.Column (db.String(30), nullable = False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated = db.Column(db.DateTime, onupdate=datetime.utcnow)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))

    def serialize(self):
        
        return {
            'id': self.id,
            'number': self.number,
            'title': self.title,
            'description': self.description,
            'author': self.author,
            'company': self.company,
            'status': self.status,
            'created': self.created,
            'updated': self.updated,
            'project_id': self.project_id,
        }


class InspectionReport(db.Model):
    __tablename__ = 'inspection_reports'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)   
    date = db.Column(db.Date, nullable = True)
    title = db.Column (db.Text, nullable = False)
    description = db.Column (db.Text, nullable = True)
    inspector = db.Column (db.String(30), nullable = False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated = db.Column(db.DateTime, onupdate=datetime.utcnow)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))

    def serialize(self):
            
            return {
                'id': self.id,
                'date': self.date,
                'title': self.title,
                'description': self.description,
                'inspector': self.inspector,
                'created': self.created,
                'updated': self.updated,
                'project_id': self.project_id,
            }
