from flask import Flask, request, redirect, render_template, flash, jsonify
from werkzeug.exceptions import Unauthorized
from flask_debugtoolbar import DebugToolbarExtension
import requests
import os
from dotenv import load_dotenv
from models import db, connect_db, User, Rental, Reservation
from sqlalchemy import and_
from helpers import create_jwt

BASE_URL = "http://127.0.0.1:"

load_dotenv()

app = Flask(__name__)

app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True

debug = DebugToolbarExtension(app)

connect_db(app)

db.drop_all()
db.create_all()


##############################################################################
# User signup/login

@app.post('/signup')
def signup():
    """Handle user signup."""

    user_data  = request.get_json()

    print(user_data, 'THE USER DATA IN SIGNUP')

    if (not user_data['image_url']):
        new_user = User.signup(username=user_data['username'], 
                           password=user_data['password'], 
                           email=user_data['email'],
                           location=user_data['location'] or None,
                           bio=user_data['bio'] or None)

    new_user = User.signup(username=user_data['username'], 
                           password=user_data['password'], 
                           email=user_data['email'],
                           image_url=user_data['image_url'],
                           location=user_data['location'] or None,
                           bio=user_data['bio'] or None)
    
    db.session.commit()
    token = create_jwt(user_data["username"])
    
    return jsonify(token=token)

# @app.route('/signup', methods=["POST"])
# def signup():
#     """Handle user signup.

#     Create new user and add to DB. Redirect to home page.

#     If form not valid, present form.

#     If the there already is a user with that username: flash message
#     and re-present form.
#     """

#     if CURR_USER_KEY in session:
#         del session[CURR_USER_KEY]
#     form = UserAddForm()

#     if form.validate_on_submit():
#         try:
#             user = User.signup(
#                 username=form.username.data,
#                 password=form.password.data,
#                 email=form.email.data,
#                 image_url=form.image_url.data or User.image_url.default.arg,
#             )
#             db.session.commit()

#         except IntegrityError:
#             flash("Username already taken", 'danger')
#             return render_template('users/signup.html', form=form)

#         do_login(user)

#         return redirect("/")

#     else:
#         return render_template('users/signup.html', form=form)





##############################################################################
# Rentals routes:

@app.get('/rentals')
def get_rentals():
    """Returns json data of all rentals"""
    rentals = Rental.query.all()
    print(rentals, 'THE RENTALS IN get_rentals')
    serialized = [r.serialize() for r in rentals]

    return jsonify(rentals=serialized)

@app.get('/rentals/<int:rental_id>')
def get_rental(rental_id):
    """Returns json data of one rental"""
    rental = Rental.query.get_or_404(rental_id)
    print(rental, 'THE RENTAL IN get_rental')
    serialized = rental.serialize()

    return jsonify(rental=serialized)

@app.get('/rentals/<username>')
def get_user_rentals(username):
    """Returns json data of all rentals for a single user"""

    user = User.query.get_or_404(username)

    rentals = user.rentals

    serialized = [r.serialize() for r in rentals]

    return jsonify(rentals=serialized)

@app.get('/rentals/<username>/<int:rental_id>')
def get_user_rental(username, rental_id):
    """Returns json data of single user's rental"""

    rental = Rental.query.filter(
        and_(Rental.id == rental_id, Rental.owner_username == username)
    ).first()

    if (not rental):
        return jsonify(rental=None)

    serialized = rental.serialize()

    return jsonify(rental=serialized)


##############################################################################
# User routes:

@app.get('/users/<username>')
def get_user(username):
    """Returns json data a user + all rentals they have"""
    user = User.query.get_or_404(username)
    print(user, 'THE user in user/username')
    serialized_user = user.serialize()
    rentals = Rental.query.filter(Rental.owner_username == username).all()
    serialized_rentals = [r.serialize() for r in rentals]

    return jsonify(user=serialized_user, rentals=serialized_rentals)


##############################################################################
# Reservations routes:

@app.get('/reservations/<username>/')
def get_user_reservations(username):
    """Returns json data of all of a user's reservations"""

    reservations = Reservation.query.filter(Reservation.renter == username)
    serialized = [r.serialize() for r in reservations]

    return jsonify(reservations=serialized)

@app.get('/reservations/<username>/<int:reservation_id>')
def get_user_reservation(username, reservation_id):
    """Returns json data of a single user reservation"""

    reservation = Reservation.query.filter(
        and_(Reservation.renter == username, Reservation.id == reservation_id)
    ).first()

    if (not reservation):
        return jsonify(reservation=None)

    serialized = reservation.serialize()

    return jsonify(reservation=serialized)



# /user/username (Profile Page)  (finished)
# /reservations/user (All their reservations)   (finished)
# /user/reservations/int:reservation-id (A single reservation)  (finished)
# /rentals/username (All their rentals)  (finished)
# /rentals/username/int:rental-id (A single rental) (finished)

# TODO: Work on Messages
# /messages/username (All their messages)
# /messages/username/int:message-id (A single message)


