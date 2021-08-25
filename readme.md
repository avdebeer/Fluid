

# FLUID

![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/navendu-pottekkat/awesome-readme?include_prereleases) 
![GitHub last commit](https://img.shields.io/github/last-commit/navendu-pottekkat/awesome-readme)
![GitHub issues](https://img.shields.io/github/issues-raw/navendu-pottekkat/awesome-readme)
![GitHub pull requests](https://img.shields.io/github/issues-pr/navendu-pottekkat/awesome-readme)
![Tweet](https://img.shields.io/twitter/url?style=flat-square&logo=twitter&url=https%3A%2F%2Fnavendu.me%2Fnsfw-filter%2Findex.html) 



Fluid is a construction management application that provides an alternative solution for managing and tracking various construction documents. Authenticated users can easily create records and upload supporting documentation to an unlimited number of projects. Requests for information, change orders, submittals and inspection reports can all be managed on per project basis. Projects are then managed via the project dashboard, which allows users to seamlessly view, create, update, and delete various record types.

# Demo-Preview
To view or demo the live application simply click [here](https://fluid-construction-management.herokuapp.com/). Note that the app has a demo feature, which allows users to checkout the app without the need to register.

# Table of contents
- [Project Title](#project-title)
- [Demo-Preview](#demo-preview)
- [Table of contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
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

# Usage

This is optional and it is used to give the user info on how to use the project after installation. This could be added in the Installation section also.
[(Back to top)](#table-of-contents)

## Project Features

# Development
This is the place where you give instructions to developers on how to modify the code.

You could give **instructions in depth** of **how the code works** and how everything is put together.

You could also give specific instructions to how they can setup their development environment.

<img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" alt="JavaScript Logo" height="50px" width="50px">

##Tech Stack

<img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" alt="JavaScript Logo" height="50px" width="50px"> <img src="https://github.com/devicons/devicon/blob/master/icons/python/python-original.svg" alt="Python Logo" height="50px" width="50px"><img src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original.svg" alt="PostgreSQL Logo" height="50px" width="50px"><img src="https://github.com/devicons/devicon/blob/master/icons/flask/flask-original.svg" alt="Flask Logo" height="50px" width="50px"><img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" alt="HTML Logo" height="50px" width="50px"><img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-original.svg" alt="CSS Logo" height="50px" width="50px"><img src="https://github.com/devicons/devicon/blob/master/icons/git/git-original.svg" alt="GIT Logo" height="50px" width="50px"><img src="https://github.com/devicons/devicon/blob/master/icons/jquery/jquery-original.svg" alt="JQuery Logo" height="50px" width="50px"><img src="https://github.com/devicons/devicon/blob/master/icons/sqlalchemy/sqlalchemy-original.svg" alt="SQLAlchemy Logo" height="50px" width="50px">



##API's


[(Back to top)](#table-of-contents)

## Authors

Jose Oropeza (Full Stack Developer)

joropeza11172@gmail.com



