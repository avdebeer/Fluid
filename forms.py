from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, TextAreaField, SelectField
from wtforms.validators import InputRequired, Optional, Length, URL, NumberRange

# SAMPLE FORM
class ProjectForm(FlaskForm):
    name = StringField('Project Name', validators = [InputRequired(message = ' Project name is required.')])
    description = TextAreaField('Description', validators = [Optional()])
    owner = StringField('Project Owner', validators = [InputRequired(message = 'Project owner is required.')])
    budget = IntegerField('Construction Budget', validators = [Optional()]) 




 