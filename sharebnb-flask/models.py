from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import UniqueConstraint
from datetime import datetime

bcrypt = Bcrypt()
db = SQLAlchemy()

DEFAULT_IMAGE_URL = "/static/images/default_profile_img.png"


class User(db.Model):
    """ User in the system """

    __tablename__ = 'users'

    def __repr__(self):
        return f"<User #{self.id}: {self.username}>"

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    email = db.Column(
        db.Text,
        nullable=False,
        unique=True,
    )

    username = db.Column(
        db.Text,
        nullable=False,
        unique=True,
    )

    image_url = db.Column(
        db.Text,
        default=DEFAULT_IMAGE_URL,
    )

    bio = db.Column(
        db.Text,
    )

    location = db.Column(
        db.Text,
    )

    password = db.Column(
        db.Text,
        nullable=False,
    )

    # messages = db.relationship('Message', backref='users')

    rentals = db.relationship('Rental', backref='users')

    @classmethod
    def signup(cls, username, email, password, image_url=DEFAULT_IMAGE_URL):
        """Sign up user. Hashes password and adds to db"""

        hashed_pwd = bcrypt.generate_password_hash(password).decode('UTF-8')

        user = User(
            username=username,
            email=email,
            password=hashed_pwd,
            image_url=image_url,
        )

        db.session.add(user)
        return user

    @classmethod
    def authenticate(cls, username, password):
        """Find user with `username` and `password`.

        If this can't find matching user (or if password is wrong), returns
        False.
        """

        user = cls.query.filter_by(username=username).first()

        if user:
            is_auth = bcrypt.check_password_hash(user.password, password)
            if is_auth:
                return user

        return False


class Rental(db.Model):
    """ Rentals available """

    __tablename__ = 'rentals'

    def __repr__(self):
        return f"<Rental #{self.id}: {self.username}>"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    description = db.Column(
        db.Text(),
        nullable=False
    )

    location = db.Column(
        db.String(100),
        nullable=False
    )

    price = db.Column(
        db.Integer,
        nullable=False
    )

    owner_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False,
    )

    reservations = db.relationship('Reservation', backref='rentals')


class Reservation(db.Model):
    """ Reservation on each rental """

    __tablename__ = 'reservations'

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    date = db.Column(
        db.String(50),
        nullable=False
    )

    rating = db.Column(
        db.Integer,
        nullable=True
    )

    rental_id = db.Column(
        db.Integer,
        db.ForeignKey('rentals.id', ondelete='CASCADE'),
        nullable=False,
    )


def connect_db(app):
    """Connect this database to provided Flask app.

    You should call this in your Flask app.
    """

    app.app_context().push()
    db.app = app
    db.init_app(app)