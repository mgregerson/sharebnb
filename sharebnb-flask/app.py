from flask import Flask, request, redirect, render_template, flash, jsonify
from flask_cors import CORS
from werkzeug.exceptions import Unauthorized
from flask_debugtoolbar import DebugToolbarExtension
import os
from dotenv import load_dotenv
from models import db, connect_db, User, Rental, Reservation
from sqlalchemy import and_
from helpers import create_jwt
import base64
from io import BytesIO
from PIL import Image
from aws import upload_file

BASE_URL = "http://127.0.0.1:"

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True

debug = DebugToolbarExtension(app)

connect_db(app)


DEFAULT_IMAGE_URL = "/static/images/default_profile_img.png"

photo_test = {
    "url": 'alsdfhlasdjlfasd.kpg',
    "bytes": 'asdojhfasdf'
}
def decode_and_upload_photo(photo_data):
    """Decodes a 64byte photo and uploads to s3 bucket"""

    url = photo_data['url']
    print(photo_data['bytes'], 'INITIAL BYTES')
    returned_bytes = photo_data['bytes'][len('data:image/jpeg;base64,'):]
    img_bytes = base64.b64decode(returned_bytes)
    # print(img_bytes, 'IMG BYTES')
    img_io = BytesIO(img_bytes)
    # print(img_io, 'THE IMG IO')
    with open(f'rental_pics/{url}', 'wb') as f:
        f.write(img_io.read())
    pillow_img = Image.open(img_io)
    pillow_img.show()
    upload_file(f'rental_pics/{url}')


#  # Load the bytes object into a BytesIO buffer
# buffer = BytesIO(image_bytes)

# # Use Pillow's Image.open method to create a Pillow Image object from the bytes
# pillow_image = Image.open(buffer)

# You can now manipulate the image using Pillow methods
# For example, you can save the image to a file using the `save()` method
# pillow_image.save("output.jpg")
    
    # print(img, 'THE IMG AFTER OPEN')
    # resized_img = img.resize((200, 200))


##############################################################################
# User signup/login

@app.post('/signup')
def signup():
    """Handle user signup."""

    user_data  = request.get_json()

    print(user_data, 'THE USER DATA IN SIGNUP')

    if ('image_url' in user_data):
        print('FIRST IF STATEMENT IS RUNNING')
        User.signup(
            username=user_data['username'],
            password=user_data['password'],
            email=user_data['email'],
            location=user_data['location'] or None,
            bio=user_data['bio'] or None,
            image_url=user_data['image_url'],
        )
    else:
        user_data['image_url'] = DEFAULT_IMAGE_URL

        User.signup(
            username=user_data['username'],
            password=user_data['password'],
            email=user_data['email'],
            location=user_data['location'] or None,
            bio=user_data['bio'] or None,
            image_url=user_data['image_url'],
        )

    db.session.commit()

    token = create_jwt(user_data["username"])

    return jsonify(token=token)

@app.post('/login')
def login():
    """Handle user login"""

    login_data = request.get_json()
    print(login_data, 'THE LOGIN DATA')
    login_status = User.authenticate(username=login_data['username'],
                                     password=login_data['password'])

    if (login_status is False):
        return Unauthorized()

    token = create_jwt(login_data["username"])

    return jsonify(token=token)

##############################################################################
# Rentals routes:

@app.get('/rentals')
def get_rentals():
    """Returns json data of all rentals"""
    rentals = Rental.query.all()
    print(rentals, 'THE RENTALS IN get_rentals')
    serialized = [r.serialize() for r in rentals]

    return jsonify(rentals=serialized)

@app.post('/rentals/<username>/add')
def add_rental(username):
    """Allows a user to add a new rental"""
    rental = request.get_json()
    photo_data = rental['rentalPhotos']
    print(photo_data, 'THE PHOTO DATA')
    decode_and_upload_photo(photo_data)
    
    return jsonify(rental)

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


# @app.patch('/rentals/<username>/<int:rental_id>', methods=['PATCH'])
# def edit_rental():
#     """Allows a user to edit a rental"""

#     return "/rentals/<username>/<int:rental_id>"

# @app.post('/rentals/<int:rental_id>/new-reservation')
# def add_reservation():
#     """Allows a user to book a new reservation"""

#     return '/rentals/<int:rental_id>/new-reservation'

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





# TODO: Work on Messages
# /messages/username (All their messages)
# /messages/username/int:message-id (A single message)


