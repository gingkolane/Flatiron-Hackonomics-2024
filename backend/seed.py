# This file will be used to seed mock data
from models.users import User
from models.accounts import Account
from models.transactions import Transaction
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
        email='test1@test.com',
        zipcode='12345'
    )
    user1.password_hash = 'Password1!'

    user2 = User(
        first_name='FirstName2',
        last_name='LastName2',
        email='test2@test.com',
        zipcode='12345'

    )
    user2.password_hash = 'Password2!'

    user3 = User(
        first_name='FirstName3',
        last_name='LastName3',
        email='test3@test.com',
        zipcode='12345'
    )
    user3.password_hash = 'Password3!'

    db.session.add_all([user1, user2, user3])
    db.session.commit()

    # Create accounts
    print('Creating accounts...')
    account1 = Account(
        id='QlRwmeljv1fxg3aolDwXSe4Kqwv3RjFwmvbzN5',
        name='Bank3',
        balance=10,
        type='Checking',
        currency='GBP',
        user_id=user1.id
    )

    account2 = Account(
        id='QlRwmeljv1fxg3aolDwXSe4Kqwv3RjFwmvbzN6',
        name='Bank4',
        balance=70,
        type='Credit',
        currency='GBP',
        limit=300,
        user_id=user1.id
    )

    account3 = Account(
        id='QlRwmeljv1fxg3aolDwXSe4Kqwv3RjFwmvbzN3',
        name='Bank3',
        balance=10,
        type='Checking',
        currency='GBP',
        user_id=user2.id
    )

    account4 = Account(
        id='QlRwmeljv1fxg3aolDwXSe4Kqwv3RjFwmvbzN4',
        name='Bank4',
        balance=70,
        type='Credit',
        currency='GBP',
        limit=300,
        user_id=user2.id
    )

    db.session.add_all([account1, account2, account3, account4])
    db.session.commit()

    # Create transations
    print('Creating transactions...')
    transaction1 = Transaction(
        name='Transaction1',
        amount=100,
        category='Category1',
        account_id=account1.id,
        completed=True,
        recurring=False
    )

    transaction2 = Transaction(
        name='Transaction2',
        amount=200,
        category='Category2',
        account_id=account1.id,
        completed=True,
        recurring=False
    )

    transaction3 = Transaction(
        name='Transaction3',
        amount=300,
        category='Category3',
        account_id=account2.id,
        completed=True,
        recurring=False
    )

    transaction4 = Transaction(
        name='Transaction4',
        amount=-200,
        category='Category4',
        account_id=account2.id,
        completed=True,
        recurring=False
    )

    db.session.add_all([transaction1, transaction2, transaction3, transaction4])
    db.session.commit()
    
    print('Seeding complete!')