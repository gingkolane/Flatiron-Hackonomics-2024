# This file will be used to seed mock data
from models.users import User
from models.accounts import Account
from app_setup import app, db
from datetime import datetime

with app.app_context():
    print('Deleting all tables...')
    db.drop_all()
    print('Creating all tables...')
    db.create_all()

    # Create users
    print('Creating users...')
    user1 = User(
        first_name='FirstName1',
        last_name='LastName1',
        email='test1@test.com'
    )
    user1.password_hash = 'Password1'

    user2 = User(
        first_name='FirstName2',
        last_name='LastName2',
        email='test2@test.com'
    )
    user2.password_hash = 'Password2'

    user3 = User(
        first_name='FirstName3',
        last_name='LastName3',
        email='test3@test.com'
    )
    user3.password_hash = 'Password3'

    db.session.add_all([user1, user2, user3])
    db.session.commit()

    # Create accounts
    print('Creating accounts...')
    account1 = Account(
        bank_name='Bank1',
        account_number='123',
        user_id=user1.id
    )

    account2 = Account(
        bank_name='Bank2',
        account_number='456',
        user_id=user1.id
    )

    account3 = Account(
        bank_name='Bank3',
        account_number='789',
        user_id=user2.id
    )

    account4 = Account(
        bank_name='Bank4',
        account_number='101112',
        user_id=user2.id
    )

    account5 = Account(
        bank_name='Bank5',
        account_number='131415',
        user_id=user3.id
    )

    account6 = Account(
        bank_name='Bank6',
        account_number='161718',
        user_id=user3.id
    )

    db.session.add_all([account1, account2, account3, account4, account5, account6])
    db.session.commit()