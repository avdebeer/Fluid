from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, TextAreaField, SelectField, PasswordField, DateField
from wtforms.fields.core import DateField
from wtforms.validators import InputRequired, Optional, ValidationError
from wtforms.widgets.core import Input

class RegistrationForm(FlaskForm):
    first_name = StringField('First Name', validators = [InputRequired(message = 'First name is a required field')])
    last_name = StringField('Last Name', validators = [InputRequired(message = 'Last name is a required field')])
    company = StringField('Company', validators = [InputRequired(message = 'Company is a required field')])
    email = StringField('Email', validators = [InputRequired(message = 'Email is a required field')])
    password = PasswordField('Password', validators = [InputRequired(message = 'Password is a required field')])


class LoginForm(FlaskForm):
    email = StringField('Email', validators = [InputRequired(message = ' Email is required.')])
    password = PasswordField('Password', validators = [InputRequired(message = ' Password is required.')])

class EditUserForm(FlaskForm):
    first_name = StringField('First Name', validators = [InputRequired(message = ' First name is required.')])
    last_name = StringField('Last Name', validators = [InputRequired(message = ' Last name is required.')])
    company = StringField('Company', validators = [InputRequired(message = ' Company name is required.')])
    password = PasswordField('Password', validators = [InputRequired(message = ' Password name is required.')])

class ProjectForm(FlaskForm):
    name = StringField('Project Name', validators = [InputRequired(message = 'Project name is required.')])
    cip_id = StringField('ID', validators = [InputRequired(message = ' Project ID is required.')])
    budget = IntegerField('Construction Budget')
    street = StringField('Street')
    city = StringField('City', validators = [InputRequired(message = 'City is required.')])
    zip_code = IntegerField('Zip Code', validators = [InputRequired(message = 'Zip code is required.')])
    description = StringField('Description')