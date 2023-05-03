from flask import Flask, request, redirect, render_template, flash, jsonify
from werkzeug.exceptions import Unauthorized
from flask_debugtoolbar import DebugToolbarExtension
import os
from dotenv import load_dotenv
from models import db, connect_db, User, Rental, Reservation

load_dotenv()

app = Flask(__name__)

app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///sharebnb'
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'postgresql:///sharebnb')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True

debug = DebugToolbarExtension(app)

connect_db(app)

db.drop_all()
db.create_all()


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

##############################################################################
# User routes: 

@app.get('/users/<user_username>')
def get_user(user_username):
    """Returns json data a user + all rentals they have"""
    user = User.query.get_or_404(user_username)
    print(user, 'THE user in user/username')
    serialized_user = user.serialize()
    rentals = Rental.query.filter(Rental.owner_username == user_username).all()
    serialized_rentals = [r.serialize() for r in rentals]

    return jsonify(user=serialized_user, rentals=serialized_rentals)



##############################################################################
# Reservations routes: 

@app.get('/reservations/<user_username>/')
def get_user_reservations(user_username):
    """Returns json data of all of a user's reservations"""

    reservations = Reservation.query.filter(Reservation.renter == user_username)
    serialized = [r.serialize() for r in reservations]

    return jsonify(reservations=serialized);



# /user (Profile Page)
# /user/reservations (All their reservations)
# /user/reservations/int:reservation-id (A single reservation)
# /user/rentals (All their rentals)
# /user/rentals/int:rental-id (A single rental)
# /user/messages (All their messages)
# /user/messages/int:message-id (A single message)

##############################################################################
# User signup/login/logout

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




