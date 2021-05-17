from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, TextAreaField, SelectField, PasswordField, DateField
from wtforms.fields.core import DateField
from wtforms.validators import InputRequired, Optional, ValidationError
from wtforms.widgets.core import Input

# SAMPLE FORM
class ProjectForm(FlaskForm):
    cip_id = StringField('Project ID', validators = [InputRequired(message = ' Project ID is required.')])
    name = StringField('Project Name', validators = [InputRequired(message = ' Project name is required.')])
    description = TextAreaField('Description', validators = [Optional()])
    budget = IntegerField('Construction Budget', validators = [Optional()]) 


class RegisterForm(FlaskForm):
    first_name = StringField('First Name', validators = [InputRequired(message = ' First name is required.')])
    last_name = StringField('Last Name', validators = [InputRequired(message = ' Last name is required.')])
    email = StringField('Email', validators = [InputRequired(message = ' Email is required.')])
    username = StringField('Username', validators = [InputRequired(message = ' Username name is required.')])
    password = PasswordField('Password', validators = [InputRequired(message = ' Password name is required.')])




class LoginForm(FlaskForm):
    username = StringField('Username', validators = [InputRequired(message = ' Username name is required.')])
    password = PasswordField('Password', validators = [InputRequired(message = ' Password name is required.')])


class InspectionForm(FlaskForm):
    date = DateField('Date', validators=[InputRequired(message = 'Date is required.')])
    title = StringField('Title', validators = [InputRequired(message = ' Title is required.')])
    description = TextAreaField('Description', validators = [InputRequired(message = ' Description is required.')])
    inspector = StringField('Inspector', validators = [InputRequired(message = ' Inspector is required.')])
    status = SelectField('Status', choices=[('In Progress'), ('Complete' )], validators = [InputRequired(message = ' Status is required.')])
