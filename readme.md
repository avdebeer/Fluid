

# FLUID

![GitHub release (latest by date)](https://img.shields.io/github/v/release/azeporo/fluid?color=orange)
![GitHub last commit](https://img.shields.io/github/last-commit/azeporo/fluid)
![Lines of code](https://img.shields.io/tokei/lines/github/azeporo/fluid)
![GitHub language count](https://img.shields.io/github/languages/count/azeporo/fluid?color=red)
![GitHub repo size](https://img.shields.io/github/repo-size/azeporo/fluid?color=cyan)

Fluid is a construction management application that provides an alternative solution for managing and tracking various construction documents. Authenticated users can easily create records and upload supporting documentation to an unlimited number of projects. Requests for Information, Change Orders, Submittals and Inspection Reports can all be managed on per project basis. Projects are then managed via the project dashboard, which allows users to seamlessly view, create, update, and delete various record types.

# Demo-Preview
To view or demo the live application simply click [here](https://fluid-construction-management.herokuapp.com/). Note that the app has a demo feature, which does not require user registration. 

# Table of contents
- [Description](#fluid)
- [Demo-Preview](#demo-preview)
- [Table of contents](#table-of-contents)
- [Installation](#installation)
- [App Features](#app-features)
- [Development](#development)
- [Author](#author)

# Installation

The following set of instructions will allow you to clone the application and run it locally on your device. Note that all of the following lines of code are ran in the terminal.

1. From within the terminal, `cd` into the directory of your choice and run the following command:

    ```
    git clone https://github.com/azeporo/Fluid.git
    ```

2. Create a virtual environment by running the following command: 
	
	```
	python3 -m venv venv
	```

3. Activate the virtual environment by running the following command:

	```
	source venv/bin/activate 
	```
	
4. Once the virtual environment is active, install all of the requirements by running the following command:

	```
	pip install -r requirements.txt
	```
	
5. Before running the application open the **app.py** file and make the following changes:
	
	1. Comment out lines 24-27 which are used to deploy to heroku.
	
	2. Uncomment line 30 so that the app is able run locally.
	
6. Install [PostgreSQL](https://www.postgresql.org/) if you don't already have it and create a new database called **azeporo**. The database can be created by running the following command:

	```
	createdb azeporo
	``` 

7. With the virtual environment active run the app by running the command listed below, then view the app on port 5000 **(http://127.0.0.1:5000/)**

	```
	flask run
	```

8. **(OPTIONAL)** If you plan on saving the app to github create a **.gitignore** file and add the **venv** folder to prevent large uploads to github.
	
[(Back to top)](#table-of-contents)

# App Features

The application is broken down into two main areas: the user dashboard and the project dashboard. In both areas users have the flexibility to seamlessly create, delete and modify content all without ever leaving the page.

### User Dashboard
The user dashboard, provides a list of all user projects. From within the user dashboard, a user is able to create, edit, or delete projects. This page also serves as the main access point for all project dashboards. Selecting a project will take the user to a specific project dashboard that contains all the relevant information.

### Project Dashboard

The project dashboard provides a convenient location for managing all project data. A navigation menu allows users to navigate between the different record types. In addition to creating, modifying and deleting records, users can also select an individual record to see the full record details as well as open any associated attachments. All these actions occur within the same page which results in a better workflow for the user.

[(Back to top)](#table-of-contents)

# Development
  
The front-end was built with JavaScript and JQuery. Custom CSS was written using SCSS and all images were sourced from Unsplash. JQuery was primarily used to facilitate the multiple Axios requests that enabeled the user and project dashboards to behave as single page applications, this was primarily done to enhance the user experience.

The back-end was developed with Python, Flask, and a PostgreSQl database. A complete REST API was developed, and one external API was used to obtain weather data. In addition, full user authentication was used.

<img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" alt="HTML Logo" height="50px" width="50px"><img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-original.svg" alt="CSS Logo" height="50px" width="50px"><img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" alt="JavaScript Logo" height="50px" width="50px"> <img src="https://github.com/devicons/devicon/blob/master/icons/jquery/jquery-original.svg" alt="JQuery Logo" height="50px" width="50px"><img src="https://github.com/devicons/devicon/blob/master/icons/python/python-original.svg" alt="Python Logo" height="50px" width="50px"><img src="https://github.com/devicons/devicon/blob/master/icons/flask/flask-original.svg" alt="Flask Logo" height="50px" width="50px"><img src="https://github.com/devicons/devicon/blob/master/icons/sqlalchemy/sqlalchemy-original.svg" alt="SQLAlchemy Logo" height="50px" width="50px"><img src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original.svg" alt="PostgreSQL Logo" height="50px" width="50px">

### API's

In addition to the built in REST API, the application uses the [Weather API](https://www.weatherapi.com/) to render the appropriate wether data for every project. Weather data is visible within the project dashboard. 


[(Back to top)](#table-of-contents)

# Author

Jose Oropeza (Full Stack Developer)

joropeza11172@gmail.com

[(Back to top)](#table-of-contents)
