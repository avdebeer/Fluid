from flask import Flask, request, send_file, render_template, redirect, flash, session, jsonify, abort
import requests
from flask_login import UserMixin, LoginManager, login_user, login_required, logout_user, current_user
from flask_debugtoolbar import DebugToolbarExtension
from sqlalchemy.sql.operators import as_
from werkzeug.utils import send_file
from models import db, connect_db, User, Project,RFI, Submittal, ChangeOrder, InspectionReport
from forms import RegistrationForm, LoginForm, EditUserForm, ProjectForm
from io import BytesIO
import os


app = Flask(__name__)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# postgres doesn't work correctly with heroku anymore, so in the environment variable, had to make sure to change to postgresql, uncomment these lines and comment out the app.config database line when pushing to heroku
uri = os.environ.get("DATABASE_URL")  
if uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)
app.config['SQLALCHEMY_DATABASE_URI'] = (uri)



# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL','postgresql:///azeporo') 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'julian2019')
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)

# db.drop_all() #DROPS ALL TABLES
# db.create_all() #CREATES ALL THE TABLES


@app.route('/')
def home():
    return render_template('home.html')



# ********************* PROJECT ROUTES ******************
# *******************************************************
@app.route('/project/<project_id>')
@login_required
def manage_project(project_id):
    '''Render the project dashboard for a specific project'''
    project = Project.query.get_or_404(project_id)
    session['project_id'] = project_id
    session['project_owner'] = project.owner

    if current_user.id != session['project_owner']:
        abort(401)

    APIKey = '6798297896f344a985a174057212605'

    response = requests.get(f'http://api.weatherapi.com/v1/current.json?key={APIKey}&q={project.zip_code}')
    weather = response.json()

    return render_template(
        'project_dashboard.html', 
        project = project,
        weather = weather
        )


@app.route('/project/edit/<project_id>')
@login_required
def get_project(project_id):
    '''Returns a project details page for updates'''
    project = Project.query.get_or_404(project_id)
    return jsonify(project.serialize())


@app.route('/project', methods=['POST'])
@login_required
def project():
    '''Creates a new project'''
    data = request.form

    new_project = Project(
        name = data['name'], 
        cip_id = data['cip_id'], 
        street = data['street'],
        city = data['city'],
        zip_code = data['zip_code'],
        description = data['description'], 
        owner = current_user.id 
        )

    db.session.add(new_project)
    db.session.commit()

    return jsonify(new_project.serialize())
    
@app.route('/project', methods=['PATCH'])
@login_required
def update_project():
    '''text'''
    data = request.json
    project_id = int(data['id'])

    project = Project.query.get_or_404(project_id)

    project.name = data['name'] 
    project.cip_id = data['cip_id'] 
    project.street = data['street']
    project.city = data['city']
    project.zip_code = data['zip_code']
    project.description = data['description'] 
    
    db.session.commit()
    return 'confirm'




@app.route('/project/<project_id>', methods=['DELETE'])
@login_required
def delete_project(project_id):

    project = Project.query.get_or_404(project_id)
    db.session.delete(project)
    db.session.commit()

    return jsonify({'message': 'Project Deleted'})

# ********************* RFI ROUTES ***************
# *******************************************************
@app.route('/project/rfi/<int:id>')
@login_required
def get_rfi_record(id):
    
    record = RFI.query.get_or_404(id)
    return jsonify(record.serialize())



@app.route('/project/rfi/document/<int:id>')
@login_required
def get_rfi_doc(id):
    '''opens or downloads the file associated with the record'''

    record = RFI.query.get_or_404(id)
    return send_file(BytesIO(record.attachment), environ=request.environ, download_name= record.file_name, as_attachment=False)



@app.route('/project/rfi', methods = ['POST'])
@login_required
def create_rfi_record():

    data = request.form
    project_id = int(data['projectID'])

    new_rfi = RFI(
        title = data['title'],
        number = data['number'],
        spec_section = data['spec_section'],
        drawing_number = data['drawing_number'],
        submittal_person = data['submittal_person'],
        submittal_date = data['submittal_date'],
        submittal_company = data['submittal_company'],
        responsible_person = data['responsible_person'],
        due_date = data['due_date'],
        responsible_company = data['responsible_company'],
        status = data['status'],
        description = data['description'],
        project_id = project_id,
        author = current_user.full_name
    )

    db.session.add(new_rfi)
    db.session.commit()

    if 'attachment' not in request.files:
        new_rfi.file_name = ''
    else:
        file = request.files['attachment']
        new_rfi.attachment = file.read()
        new_rfi.file_name = file.filename
    
    db.session.commit()
    return jsonify(new_rfi.serialize())



@app.route('/project/rfi', methods = ['PATCH'])
@login_required
def update_rfi_record():

    data = request.form

    record_id = int(data['id'])
    record = RFI.query.get_or_404(record_id)

    record.title = data['title']
    record.number = data['number']
    record.spec_section = data['spec_section']
    record.drawing_number = data['drawing_number']
    record.submittal_person = data['submittal_person']
    record.submittal_date = data['submittal_date']
    record.submittal_company = data['submittal_company']
    record.responsible_person = data['responsible_person']
    record.due_date = data['due_date']
    record.responsible_company = data['responsible_company']
    record.status = data['status']
    record.description = data['description']

    if 'attachment' in request.files:
        file = request.files['attachment']
        record.attachment = file.read()
        record.file_name = file.filename

    db.session.commit()
    return jsonify("Updated record succesfully.")



@app.route('/project/rfi/<int:record_id>', methods = ['DELETE'])
@login_required
def delete_rfi_record(record_id):
    '''Deletes an inspection report'''

    record = RFI.query.get_or_404(record_id)
    db.session.delete(record)
    db.session.commit()

    return jsonify({'message': 'Deleted'})

# ********************* SUBMITTAL ROUTES ***************
# *******************************************************
@app.route('/project/submittal/<int:id>')
@login_required
def get_submittal_record(id):
    
    record = Submittal.query.get_or_404(id)
    return jsonify(record.serialize())



@app.route('/project/submittal/document/<int:id>')
@login_required
def get_submittal_doc(id):
    '''opens or downloads the file associated with the record'''

    record = Submittal.query.get_or_404(id)
    return send_file(BytesIO(record.attachment), environ=request.environ, download_name= record.file_name, as_attachment=False)



@app.route('/project/submittal', methods = ['POST'])
@login_required
def create_submittal_record():

    data = request.form
    project_id = int(data['projectID'])

    new_submittal = Submittal(
        title = data['title'],
        number = data['number'],
        spec_section = data['spec_section'],
        type = data['type'],
        submittal_person = data['submittal_person'],
        submittal_date = data['submittal_date'],
        submittal_company = data['submittal_company'],
        responsible_person = data['responsible_person'],
        due_date = data['due_date'],
        responsible_company = data['responsible_company'],
        status = data['status'],
        description = data['description'],
        project_id = project_id,
        author = current_user.full_name
    )

    db.session.add(new_submittal)
    db.session.commit()

    if 'attachment' not in request.files:
        new_submittal.file_name = ''
    else:
        file = request.files['attachment']
        new_submittal.attachment = file.read()
        new_submittal.file_name = file.filename
    
    db.session.commit()
    return jsonify(new_submittal.serialize())



@app.route('/project/submittal', methods = ['PATCH'])
@login_required
def update_submittal_record():

    data = request.form

    record_id = int(data['id'])
    record = Submittal.query.get_or_404(record_id)

    record.title = data['title']
    record.number = data['number']
    record.spec_section = data['spec_section']
    record.type = data['type']
    record.submittal_person = data['submittal_person']
    record.submittal_date = data['submittal_date']
    record.submittal_company = data['submittal_company']
    record.responsible_person = data['responsible_person']
    record.due_date = data['due_date']
    record.responsible_company = data['responsible_company']
    record.status = data['status']
    record.description = data['description']

    if 'attachment' in request.files:
        file = request.files['attachment']
        record.attachment = file.read()
        record.file_name = file.filename

    db.session.commit()
    return jsonify("Updated record succesfully.")



@app.route('/project/submittal/<int:record_id>', methods = ['DELETE'])
@login_required
def delete_submittal_record(record_id):
    '''Deletes an inspection report'''

    record = Submittal.query.get_or_404(record_id)
    db.session.delete(record)
    db.session.commit()

    return jsonify({'message': 'Deleted'})


# ********************* CHANGE ORDER ROUTES ***************
# *******************************************************
@app.route('/project/change_order/<int:id>')
@login_required
def get_changeorder_record(id):
    
    record = ChangeOrder.query.get_or_404(id)
    return jsonify(record.serialize())



@app.route('/project/change_order/document/<int:id>')
@login_required
def get_changeorder_doc(id):
    '''opens or downloads the file associated with the record'''

    record = ChangeOrder.query.get_or_404(id)
    return send_file(BytesIO(record.attachment), environ=request.environ, download_name= record.file_name, as_attachment=False)



@app.route('/project/change_order', methods = ['POST'])
@login_required
def create_changeorder_record():

    data = request.form
    project_id = int(data['projectID'])

    new_change_order = ChangeOrder(
        title = data['title'],
        number = data['number'],
        submittal_person = data['submittal_person'],
        submittal_date = data['submittal_date'],
        submittal_company = data['submittal_company'],
        responsible_person = data['responsible_person'],
        responsible_company = data['responsible_company'],
        type = data['type'],
        cost = data['cost'],
        status = data['status'],
        description = data['description'],
        project_id = project_id,
        author = current_user.full_name
    )

    db.session.add(new_change_order)
    db.session.commit()

    if 'attachment' not in request.files:
        new_change_order.file_name = ''
    else:
        file = request.files['attachment']
        new_change_order.attachment = file.read()
        new_change_order.file_name = file.filename

    db.session.commit()
    return jsonify(new_change_order.serialize())



@app.route('/project/change_order', methods = ['PATCH'])
@login_required
def update_changeorder_record():

    data = request.form

    record_id = int(data['id'])
    record = ChangeOrder.query.get_or_404(record_id)

    record.title = data['title']
    record.number = data['number']
    record.submittal_person = data['submittal_person']
    record.submittal_date = data['submittal_date']
    record.submittal_company = data['submittal_company']
    record.responsible_person = data['responsible_person']
    record.responsible_company = data['responsible_company']
    record.type = data['type']
    record.cost = data['cost']
    record.status = data['status']
    record.description = data['description']

    if 'attachment' in request.files:
        file = request.files['attachment']
        record.attachment = file.read()
        record.file_name = file.filename

    db.session.commit()
    return jsonify("Updated record succesfully.")



@app.route('/project/change_order/<int:record_id>', methods = ['DELETE'])
@login_required
def delete_changeorder_record(record_id):
    '''Deletes an inspection report'''

    record = ChangeOrder.query.get_or_404(record_id)
    db.session.delete(record)
    db.session.commit()

    return jsonify({'message': 'Deleted'})

# ********************* INSPECTION ROUTES ***************
# *******************************************************
@app.route('/project/inspection/<int:id>')
@login_required
def get_inspection_record(id):
    '''Returns the data for a single record'''
    
    record = InspectionReport.query.get_or_404(id)
    return jsonify(record.serialize())


@app.route('/project/inspection/document/<int:id>')
@login_required
def get_inspection_doc(id):
    '''opens or downloads the file associated with the record'''

    record = InspectionReport.query.get_or_404(id)
    return send_file(BytesIO(record.attachment), environ=request.environ, download_name= record.file_name, as_attachment=False)


@app.route('/project/inspection', methods = ['POST'])
@login_required
def create_inspection_record():

    data = request.form
    project_id = int(data['projectID'])

    new_inspection_report = InspectionReport(
        title = data['title'],
        report_number = data['report_number'],
        date = data['date'],
        inspector = data['inspector'],
        description = data['description'],
        author = current_user.full_name,
        project_id = project_id
    )

    db.session.add(new_inspection_report)
    db.session.commit()

    if 'attachment' not in request.files:
        new_inspection_report.file_name = ''
    else:
        file = request.files['attachment']
        new_inspection_report.attachment = file.read()
        new_inspection_report.file_name = file.filename

    db.session.commit()
    return jsonify(new_inspection_report.serialize())


   
@app.route('/project/inspection', methods = ['PATCH'])
@login_required
def update_inspection_record():

    data = request.form
    record_id = int(data['id'])
    record = InspectionReport.query.get_or_404(record_id)

    record.title = data['title']
    record.report_number = data['report_number']
    record.inspector = data['inspector']
    record.date = data['date']
    record.description = data['description']

    if 'attachment' in request.files:
        file = request.files['attachment']
        record.attachment = file.read()
        record.file_name = file.filename
    
    db.session.commit()
    return jsonify("Updated record succesfully.")



@app.route('/project/inspection/<int:record_id>', methods = ['DELETE'])
@login_required
def delete_inspection_record(record_id):
    '''Deletes an inspection report'''

    record = InspectionReport.query.get_or_404(record_id)
    db.session.delete(record)
    db.session.commit()

    return jsonify({'message': 'Deleted'})

# ********************* USER ROUTES *********************
# *******************************************************

@app.route('/register', methods=['GET', 'POST'])
def register_new_user():
    '''Registers a new user'''
    if current_user.is_authenticated:
        return redirect('/dashboard')

    form = RegistrationForm()

    user_exists = bool(User.query.filter_by(email=form.email.data).first())

    if user_exists == True:
        flash('A profile for this email already exists.')
        return render_template('register.html', form = form)


    if form.validate_on_submit():
        first_name = form.first_name.data
        last_name = form.last_name.data
        full_name = first_name + " " + last_name
        company = form.company.data
        email = form.email.data
        password = form.password.data
        
        new_user = User.register(first_name, last_name, full_name, company, email, password)
        db.session.add(new_user)
        db.session.commit()

        return redirect('/dashboard')
        
    else:
        return render_template('register.html', form = form)



@app.route('/login', methods=['GET', 'POST'])
def login():
    '''Returns the login form or logs in a user'''
    if current_user.is_authenticated:
        return redirect('/dashboard')

    form = LoginForm()

    if form.validate_on_submit():
        email = request.form['email']
        password = request.form['password']
        
        user = User.authenticate(email, password)
        if user:
            login_user(user)
            return redirect('/dashboard')
        else:
            flash('Incorrect email or password!')

    return render_template('login.html', form=form)


@app.route('/demo', methods=['GET', 'POST'])
def demo_app():

    email = 'julian@gmail.com'
    password = 'Forrest2019'
    
    user = User.authenticate(email, password)
    if user:
        login_user(user)
        return redirect('/dashboard')



@app.route('/edit_profile', methods=['Get', ' POST'])
def update_profile():
    
    form = EditUserForm()
    user = current_user.id

    if form.validate_on_submit():
        email = current_user.email
        password = request.form['password']
        
        user = User.authenticate(email, password)
        if user:
            login_user(user)
            return redirect('/dashboard')

    return render_template('profile_update.html', form=form, user = user)


@app.route('/logout', methods = ['GET', 'POST'])
@login_required
def logout():
    '''Logsout the current user'''
    logout_user()
    return redirect('/login')


@app.route('/dashboard')
@login_required
def dashboard():
    '''Loads the User Dashboard'''
    projects = current_user.projects

    return render_template('user_dashboard.html', projects = projects)


@app.errorhandler(400)
def processing_error(e):

    return render_template('error.html', error = 400, message = "Oops! We can't seem to process your request.")

@app.errorhandler(401)
def unauthorized(e):

    return render_template('error.html', error = 401, message = "You are not authorized to access this page.")

@app.errorhandler(404)
def not_found(e):

    return render_template('error.html', error = 404, message = "Oops! The page can't be found.")

@app.errorhandler(500)
def server_error(e):

    return render_template('error.html', error = 404, message = "Oops! Our server is having a bad day.")


