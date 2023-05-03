from app import db
from models import db, connect_db, User, Rental, Reservation

db.drop_all()
db.create_all()

# Add Users
john = User.register('john@example.com', 'john_doe', 'https://example.com/john.jpg', 'I am a software engineer', 'San Francisco, CA', 'password')
jane = User.register('jane@example.com', 'jane_doe', 'https://example.com/jane.jpg', 'I am a software engineer', 'San Francisco, CA', 'password')
alex = User.register('alex@example.com', 'alex_smith', 'https://example.com/alex.jpg', 'I am a software engineer', 'New York, NY', 'password')

# Add new objects to session, so they'll persist
db.session.add(john)
db.session.add(jane)
db.session.add(alex)

db.session.commit()

# Add Rentals


db.session.commit()