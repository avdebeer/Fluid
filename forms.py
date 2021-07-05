from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, TextAreaField, SelectField, PasswordField, DateField
from wtforms.fields.core import DateField
from wtforms.validators import InputRequired, Optional, ValidationError
from wtforms.widgets.core import Input

class RegisterForm(FlaskForm):
    first_name = StringField('First Name', validators = [InputRequired(message = ' First name is required.')])
    last_name = StringField('Last Name', validators = [InputRequired(message = ' Last name is required.')])
    company = StringField('Company', validators = [InputRequired(message = ' Company name is required.')])
    email = StringField('Email', validators = [InputRequired(message = ' Email is required.')])
    password = PasswordField('Password', validators = [InputRequired(message = ' Password name is required.')])


class LoginForm(FlaskForm):
    email = StringField('Email', validators = [InputRequired(message = ' Email is required.')])
    password = PasswordField('Password', validators = [InputRequired(message = ' Password is required.')])

class EditUserForm(FlaskForm):
    first_name = StringField('First Name', validators = [InputRequired(message = ' First name is required.')])
    last_name = StringField('Last Name', validators = [InputRequired(message = ' Last name is required.')])
    company = StringField('Company', validators = [InputRequired(message = ' Company name is required.')])
    password = PasswordField('Password', validators = [InputRequired(message = ' Password name is required.')])