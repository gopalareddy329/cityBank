
# Backend

MyApp is a simple Django REST framework application that allows users to register and retrieve their details.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Installing

1. Clone the repository:
Change to the project directory:
Create a virtual environment and activate it:
python3 -m venv venv
source venv/bin/activate

Install the required packages:
pip install -r requirements.txt


Run the migrations:
python manage.py migrate


Start the development server:
python manage.py runserver


Usage:
Registering a user
To register a user, make a POST request to the /register/ endpoint with the following data:
username_or_email (required): The username or email address of the user.
password (required): The password of the user.
name (optional): The name of the user. If not provided, the username will be used.
email (optional): The email address of the user. If not provided, the username will be used.

Login:
username (required): The username or email address of the user.
password (required): The password of the user.