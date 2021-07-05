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
    company = db.Column(db.String(30), nullable = False)
    email = db.Column(db.Text, nullable = False, unique = True)
    password = db.Column(db.Text, nullable = False)
    full_name = db.Column(db.String(50), nullable = True)

    projects = db.relationship('Project', cascade = 'all, delete' )

    @classmethod
    def register(cls, first_name, last_name, full_name, company, email, password):
        """Register user w/hashed password & return user."""

        hashed = bcrypt.generate_password_hash(password)
        hashed_utf8 = hashed.decode("utf8")

        # return instance of user w/username and hashed pwd
        return cls( first_name=first_name, last_name=last_name, full_name=full_name, company=company, email=email, password=hashed_utf8)
  
    @classmethod
    def authenticate(cls, email, password):
        """Validate that user exists & password is correct.

        Return user if valid; else return False.
        """

        user = User.query.filter_by(email=email).first()

        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return False

# *********************** PROJECT MODELS *********************** 


class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column (db.Integer, primary_key = True, autoincrement = True)
    name = db.Column (db.Text, nullable = False)
    cip_id = db.Column (db.Text, unique = True)
    budget = db.Column(db.Integer, nullable = True)
    street = db.Column (db.Text, nullable = True)
    city = db.Column (db.Text, nullable = False)
    zip_code = db.Column(db.Integer, nullable = False)
    description = db.Column (db.Text, nullable = True)

    
    owner = db.Column(db.Integer, db.ForeignKey('users.id'))


    rfis = db.relationship('RFI', cascade = 'all, delete')
    submittals = db.relationship('Submittal', cascade = 'all, delete')
    change_orders = db.relationship('ChangeOrder', cascade = 'all, delete')
    inspection_reports = db.relationship('InspectionReport', cascade = 'all, delete')

    def serialize(self):
        
        return {
            'id': self.id,
            'name': self.name,
            'cip_id': self.cip_id,
            'budget': self.budget,
            'street': self.street,
            'city': self.city,
            'zip_code': self.zip_code,
            'description': self.description,
            'owner': self.owner,
        }
    

class RFI(db.Model):
    __tablename__ = 'rfis'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    title = db.Column (db.Text, nullable = False)
    number = db.Column(db.Float, nullable = False)
    spec_section = db.Column (db.String(50), nullable = True)
    drawing_number = db.Column (db.String(50), nullable = True)
    submittal_person = db.Column (db.String(50), nullable = False)
    submittal_company = db.Column (db.String(50), nullable = False)
    submittal_date = db.Column(db.Date, nullable = False)
    responsible_person = db.Column (db.String(50), nullable = True)
    responsible_company = db.Column (db.String(50), nullable = True)
    due_date = db.Column(db.Date, nullable = False)
    status = db.Column (db.String(30), nullable = False)
    description = db.Column (db.Text, nullable = True)
   
    author = db.Column (db.String(50), nullable = False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated = db.Column(db.DateTime, onupdate=datetime.utcnow, default=datetime.utcnow)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))

    def serialize(self):
        
        return {

            'id': self.id,
            'title': self.title,
            'number': self.number,
            'spec_section': self.spec_section,
            'drawing_number': self.drawing_number,
            'submittal_person': self.submittal_person,
            'submittal_company': self.submittal_company,
            'submittal_date': self.submittal_date,
            'responsible_person': self.responsible_person,
            'responsible_company': self.responsible_company,
            'due_date': self.due_date,
            'status': self.status,
            'description': self.description,
            'author': self.author,
            'created': self.created,
            'updated': self.updated,
            'project_id': self.project_id,
        }


class Submittal(db.Model):
    __tablename__ = 'submittals'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    title = db.Column (db.Text, nullable = False)
    number = db.Column(db.Float, nullable = False)
    spec_section = db.Column (db.String(50), nullable = True)
    type = db.Column (db.String(50), nullable = True)
    submittal_person = db.Column (db.String(50), nullable = False)
    submittal_date = db.Column(db.Date, nullable = False)
    submittal_company = db.Column (db.String(50), nullable = False)
    responsible_person = db.Column (db.String(50), nullable = True)
    due_date = db.Column(db.Date, nullable = False)
    responsible_company = db.Column (db.String(50), nullable = True)
    status = db.Column (db.String(30), nullable = False)
    description = db.Column (db.Text, nullable = True)
   
    author = db.Column (db.String(50), nullable = False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated = db.Column(db.DateTime, onupdate=datetime.utcnow)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))

    def serialize(self):
        
        return {

            'id': self.id,
            'title': self.title,
            'number': self.number,
            'spec_section': self.spec_section,
            'type': self.type,
            'submittal_person': self.submittal_person,
            'submittal_date': self.submittal_date,
            'submittal_company': self.submittal_company,
            'responsible_person': self.responsible_person,
            'due_date': self.due_date,
            'responsible_company': self.responsible_company,
            'status': self.status,
            'description': self.description,
            'author': self.author,
            'created': self.created,
            'updated': self.updated,
            'project_id': self.project_id,
        }

class ChangeOrder(db.Model):
    __tablename__ = 'change_orders'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    title = db.Column (db.Text, nullable = False)
    number = db.Column(db.Float, nullable = False)
    submittal_person = db.Column (db.String(50), nullable = False)
    submittal_date = db.Column(db.Date, nullable = False)
    submittal_company = db.Column (db.String(50), nullable = False)
    responsible_person = db.Column (db.String(50), nullable = True)
    responsible_company = db.Column (db.String(50), nullable = True)
    type = db.Column (db.String(50), nullable = True)
    cost = db.Column(db.Float, nullable = True)
    status = db.Column (db.String(30), nullable = False)
    description = db.Column (db.Text, nullable = True)
   
    author = db.Column (db.String(50), nullable = False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated = db.Column(db.DateTime, onupdate=datetime.utcnow)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))

    def serialize(self):
        
        return {

            'id': self.id,
            'title': self.title,
            'number': self.number,
            'submittal_person': self.submittal_person,
            'submittal_date': self.submittal_date,
            'submittal_company': self.submittal_company,
            'responsible_person': self.responsible_person,
            'responsible_company': self.responsible_company,
            'type': self.type,
            'cost': self.cost,
            'status': self.status,
            'description': self.description,
            'author': self.author,
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
    author = db.Column (db.String(50), nullable = False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated = db.Column(db.DateTime, onupdate=datetime.utcnow)
    attachment = db.column(db.LargeBinary)

    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))

    def serialize(self):
            
            return {
                'id': self.id,
                'date': self.date,
                'title': self.title,
                'description': self.description,
                'inspector': self.inspector,
                'created': self.created,
                'author': self.author,
                'updated': self.updated,
                'project_id': self.project_id,
            }
