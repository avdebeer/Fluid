from flask_sqlalchemy import SQLAlchemy 

db = SQLAlchemy()

def connect_db(app):
    '''Connect to datbase'''
    db.app = app
    db.init_app(app)

# SAMPLE MODEL
class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column (db.Text, nullable = False, unique = True)
    name = db.Column (db.Text, nullable = False)
    description = db.Column (db.Text, nullable = True)
    owner = db.Column (db.Text, nullable = False)
    budget = db.Column(db.Integer, nullable = True)

    change_orders = db.relationship('ChangeOrder')
    rfis = db.relationship('RFI')
    issues = db.relationship('Issue')
    action_items = db.relationship('ActionItem')
    inspection_logs = db.relationship('InspectionLog)
    meetings = db.relationship('Meeting')
    
class ChangeOrder(db.Model):
    __tablename__ = 'change_orders'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)   
    number = db.Column(db.Integer, nullable = True)
    title = db.Column (db.Text, nullable = False)
    description = db.Column (db.Text, nullable = True)
    creator = db.Column (db.Text, nullable = True)
    status = db.Column (db.Text, nullable = False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id', ondelete = 'CASCADE'))


class RFI(db.Model):
    __tablename__ = 'rfis'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)   
    number = db.Column(db.Integer, nullable = True)
    title = db.Column (db.Text, nullable = False)
    description = db.Column (db.Text, nullable = True)
    creator = db.Column (db.Text, nullable = True)
    status = db.Column (db.Text, nullable = False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id', ondelete = 'CASCADE'))



class Issue(db.Model):
    __tablename__ = 'issues'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)   
    number = db.Column(db.Integer, nullable = True)
    title = db.Column (db.Text, nullable = False)
    description = db.Column (db.Text, nullable = True)
    creator = db.Column (db.Text, nullable = True)
    status = db.Column (db.Text, nullable = False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id', ondelete = 'CASCADE'))



class ActionItem(db.Model):
    __tablename__ = 'action_items'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)   
    number = db.Column(db.Integer, nullable = True)
    title = db.Column (db.Text, nullable = False)
    description = db.Column (db.Text, nullable = True)
    assignor = db.Column (db.Text, nullable = True)
    assignee = db.Column (db.Text, nullable = True)
    due_date = db.Column (db.DateTime, nullable = True)
    status = db.Column (db.Text, nullable = False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id', ondelete = 'CASCADE'))



class InspectionLog(db.Model):
    __tablename__ = 'inspection_logs'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)   
    date = db.Column(db.DateTime, nullable = True)
    name = db.Column (db.Text, nullable = False)
    description = db.Column (db.Text, nullable = True)
    inspector = db.Column (db.Text, nullable = True)
    status = db.Column (db.Text, nullable = False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id', ondelete = 'CASCADE'))



class Meeting(db.Model):
    __tablename__ = 'meetings'

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)   
    date = db.Column(db.DateTime, nullable = True)
    name = db.Column (db.Text, nullable = False)
    description = db.Column (db.Text, nullable = True)
    meeting_minutes = db.Column (db.Text, nullable = True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id', ondelete = 'CASCADE'))
