from flask import Flask, request, render_template, redirect, flash, url_for, session, jsonify
from flask_login import UserMixin, LoginManager, login_user, login_required, logout_user, current_user
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Project, ChangeOrder, RFI, Issue, ActionItem, InspectionReport
from forms import ProjectForm, RegisterForm, LoginForm


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
def project():
    '''text'''

    form = ProjectForm()

    if form.validate_on_submit():
        cip_id = form.cip_id.data
        name = form.name.data
        description = form.description.data
        owner = current_user.id
        budget = form.budget.data
        
        new_project = Project(cip_id = cip_id, name = name, description = description, owner = owner, budget = budget)
        db.session.add(new_project)
        db.session.commit()
        return redirect('/dashboard')

    else:
        return render_template('project.html', form = form)



@app.route('/project/<project_id>')
@login_required
def manage_project(project_id):
    project = Project.query.get_or_404(project_id)
    session['project_id'] = project_id

    return render_template(
        'project_details.html', 
        project = project 
        )



# ********************* INSPECTION ROUTES ***************
# *******************************************************



@app.route('/project/inspection', methods = ['PATCH','POST'])
def create_report():

    data = request.json

    project_id = int(data['projectID'])
    date = data['date'],
    title = data['title'],
    description = data['description'],
    inspector = data['inspector'],
    status = data['status'],

    if request.method == 'POST':
        new_inspection_report = InspectionReport(
            project_id = project_id,
            date = date,
            title = title,
            description = description,
            inspector = inspector,
            status = status
            )

        db.session.add(new_inspection_report)
        db.session.commit()
        return jsonify(new_inspection_report.serialize())

    elif request.method == 'PATCH':
        record_id = int(data['id'])
        record = InspectionReport.query.get_or_404(record_id)
        record.date = date
        record.title = title
        record.description = description
        record.inspector = inspector
        record.status = status
        
        db.session.commit()
        return jsonify("Updated record succesfully.")



@app.route('/project/inspection/<int:report_id>', methods = ['DELETE'])
def delete_report(report_id):
    '''Deletes an inspection report'''

    record = InspectionReport.query.get_or_404(report_id)
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
        email = request.form['email']
        username = request.form['username']
        password = request.form['password']
        
        new_user = User.register(first_name, last_name, email, username, password)
        db.session.add(new_user)
        db.session.commit()

        return redirect('/dashboard')

    return render_template('register.html', form=form)



@app.route('/login', methods=['GET', 'POST'])
def login():

    form = LoginForm()

    if form.validate_on_submit():
        username = request.form['username']
        password = request.form['password']
        
        user = User.authenticate(username, password)
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



    return render_template('dashboard.html', projects = projects)
# *********************  ROUTES *********************
# *******************************************************
@app.route('/testing')
def testing():
    return render_template('testing.html')


