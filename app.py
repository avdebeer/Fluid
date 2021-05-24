from flask import Flask, request, render_template, redirect, flash, url_for, session, jsonify
from flask_login import UserMixin, LoginManager, login_user, login_required, logout_user, current_user
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Project,RFI, Submittal, ChangeOrder, InspectionReport
from forms import RegisterForm, LoginForm


app = Flask(__name__)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///azeporo' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'hello'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)

# db.drop_all() #DROPS ALL TABLES
db.create_all() #CREATES ALL THE TABLES


@app.route('/')
def home():
    return render_template('base.html')



# ********************* PROJECT ROUTES ******************
# *******************************************************

@app.route('/project', methods=['GET', 'POST'])
@login_required
def project():
    '''text'''
    data = request.json

    new_project = Project(
        cip_id = data['cip_id'], 
        name = data['name'], 
        budget = data['budget'],
        description = data['description'], 
        owner = current_user.id 
        )

    db.session.add(new_project)
    db.session.commit()
    return redirect('/dashboard')


@app.route('/project/<project_id>')
@login_required
def manage_project(project_id):
    project = Project.query.get_or_404(project_id)
    session['project_id'] = project_id

    return render_template(
        'project_dashboard.html', 
        project = project 
        )

# ********************* RFI ROUTES ***************
# *******************************************************
@app.route('/project/rfi/<int:id>')
@login_required
def get_rfi_record(id):
    
    record = RFI.query.get_or_404(id)
    return jsonify(record.serialize())



@app.route('/project/rfi', methods = ['POST'])
@login_required
def create_rfi_record():

    data = request.json
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
    return jsonify(new_rfi.serialize())



@app.route('/project/rfi', methods = ['PATCH'])
@login_required
def update_rfi_record():

    data = request.json

    record_id = int(data['id'])
    record = RFI.query.get_or_404(record_id)

    record.title = data['title'],
    record.number = data['number'],
    record.spec_section = data['spec_section'],
    record.drawing_number = data['drawing_number'],
    record.submittal_person = data['submittal_person'],
    record.submittal_date = data['submittal_date'],
    record.submittal_company = data['submittal_company'],
    record.responsible_person = data['responsible_person'],
    record.due_date = data['due_date'],
    record.responsible_company = data['responsible_company'],
    record.status = data['status'],
    record.description = data['description'],

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



@app.route('/project/submittal', methods = ['POST'])
@login_required
def create_submittal_record():

    data = request.json
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
    return jsonify(new_submittal.serialize())



@app.route('/project/submittal', methods = ['PATCH'])
@login_required
def update_submittal_record():

    data = request.json

    record_id = int(data['id'])
    record = Submittal.query.get_or_404(record_id)

    record.title = data['title'],
    record.number = data['number'],
    record.spec_section = data['spec_section'],
    record.type = data['type'],
    record.submittal_person = data['submittal_person'],
    record.submittal_date = data['submittal_date'],
    record.submittal_company = data['submittal_company'],
    record.responsible_person = data['responsible_person'],
    record.due_date = data['due_date'],
    record.responsible_company = data['responsible_company'],
    record.status = data['status'],
    record.description = data['description'],

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
@app.route('/project/change_order', methods = ['POST'])
@login_required
def create_change_order_record():

    data = request.json
    project_id = int(data['projectID'])

    new_change_order = ChangeOrder(
        number = data['number'],
        title = data['title'],
        description = data['description'],
        author = data['author'],
        company = data['company'],
        status = data['status'],
        project_id = project_id,

        )

    db.session.add(new_change_order)
    db.session.commit()
    return jsonify(new_change_order.serialize())



@app.route('/project/change_order', methods = ['PATCH'])
@login_required
def update_change_order_record():

    data = request.json

    record_id = int(data['id'])
    record = ChangeOrder.query.get_or_404(record_id)
    record.number = data['number'],
    record.title = data['title'],
    record.description = data['description'],
    record.author = data['author'],
    record.company = data['company'],
    record.status = data['status'],

    db.session.commit()
    return jsonify("Updated record succesfully.")



@app.route('/project/change_order/<int:record_id>', methods = ['DELETE'])
@login_required
def delete_change_order_record(record_id):
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
    
    record = InspectionReport.query.get_or_404(id)
    return jsonify(record.serialize())


@app.route('/project/inspection', methods = ['POST'])
@login_required
def create_inspection_record():

    data = request.json
    project_id = int(data['projectID'])

    author = current_user.first_name + " " + current_user.last_name,

    new_inspection_report = InspectionReport(
        title = data['title'],
        date = data['date'],
        inspector = data['inspector'],
        description = data['description'],
        author = author,
        project_id = project_id,

        )

    db.session.add(new_inspection_report)
    db.session.commit()

    return jsonify(new_inspection_report.serialize())



@app.route('/project/inspection', methods = ['PATCH'])
@login_required
def update_inspection_record():

    data = request.json

    record_id = int(data['id'])
    record = InspectionReport.query.get_or_404(record_id)
    record.title = data['title']
    record.inspector = data['inspector']
    record.date = data['date']
    record.description = data['description']
        
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
def register():

    form = RegisterForm()

    if form.validate_on_submit():
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        full_name = first_name + " " + last_name
        company = request.form['company']
        email = request.form['email']
        password = request.form['password']
        
        new_user = User.register(first_name, last_name, full_name, company, email, password)
        db.session.add(new_user)
        db.session.commit()

        return redirect('/dashboard')

    return render_template('register.html', form = form)



@app.route('/login', methods=['GET', 'POST'])
def login():

    form = LoginForm()

    if form.validate_on_submit():
        email = request.form['email']
        password = request.form['password']
        
        user = User.authenticate(email, password)
        if user:
            login_user(user)
            flash('Logged in successfully.')
            return redirect('/dashboard')

    return render_template('login.html', form=form)



@app.route('/logout', methods = ['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect('/login')


@app.route('/dashboard')
@login_required
def dashboard():
    projects = current_user.projects

    return render_template('user_dashboard.html', projects = projects)
# *********************  ROUTES *********************
# *******************************************************


@app.route('/test')
def test():
    return render_template('working.html')
