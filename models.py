from flask_sqlalchemy import SQLAlchemy 

db = SQLAlchemy()

def connect_db(app):
    '''Connect to datbase'''
    db.app = app
    db.init_app(app)

# SAMPLE MODEL
class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)   
    project_id = db.Column (db.Text, nullable = False)
    name = db.Column (db.Text, nullable = False)
    description = db.Column (db.Text, nullable = True)
    owner = db.Column (db.Text, nullable = False)
    budget = db.Column(db.Integer, nullable = True)
    
