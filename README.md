Flatiron Hackonomics 2024, Team 10 The Ledger Ends

Money Magnet - A budget app that helps you to reach your life goals

Product featuers: easy onboarding, easy data entry, auto-populating recommendations for budgeting based on location-based spending data. 

App USP: An budgeting as reaching life goals

The mobile app has four sections: accounts, transactions, budgets and goals. 

----
Backend:
- IPython backend using the Flask-SQLAlchemy framework
- JSON Web Tokens (JWT) stored in cookies
- Error handling and validations 
- Plaid integration

Frontend: 
React native
UI library: Tailwind, RN paper, locofy ai 
Open AI API
Image-to-text integration

Generated AI response by using OpenAi’s Chat Text generation model.
Utilized GPT-3.5-Turbo for cut cost and increase the speed responses that are generated. GPT-4 provides more in-depth and accurate responses, however, it takes significantly more time to generate a response. 
Program GPT with set of initial instructions – e.g. ‘you are a helpful personal finance assistant. Return JSON’; Followed by the prompt/question. The prompt can be coupled with user data, such as name, location, goals, ect, for personalized responses.
https://platform.openai.com/docs/overview



### Starting the frontend server:

Running the App on a Mac:

1. Download Xcode from the App Store
   - This is necessary to use the iOS Simulator, allowing you to test iOS apps directly on your Mac.

2. Open Terminal
   
3. Navigate to  Project Directory
     cd frontend

4. Install Necessary Packages
   - Run the following command to install all required packages (if this is your first time or if there are any updates):
     npm install

5. Start Your Project with Expo
   - Enter the following command to start your project:
     npx expo start
   - A QR code and some commands will appear in your terminal window.

6. Open the App in iOS Simulator
   - Press 'i' to launch the app in the iOS Simulator.

Running the App on an iPhone:

1. Download Expo Go from the App Store
   - This app allows you to run your project directly on your iPhone for testing.

2. Scan the QR Code with Your iPhone Camera
   - Open the Camera app on your iPhone and scan the QR code displayed in the terminal after starting your project with Expo.
   - This will automatically prompt you to open the project in Expo Go.

Good luck! If you encounter any issues, don't hesitate to message Landon for help.

### Starting the backend server:
1. Navigate into the backend folder

2. Set up your .env file:
   - Within the backend folder, run `touch .env` in your terminal to create the .env file
   - Inside the `.env` file, add two variables: `APP_SECRET=` and `JWT_SECRET_KEY=`
   - In your terminal, type `python` and press enter to enter a python environment. Run the following commands: `import secrets` and `print(secrets.token_hex())`
   - Copy the output and paste it after the `=`. It should look something like `APP_SECRET=f440a395514e01d80d85c94c4d711cc7ddbbb8073e0e5e9541c005045fc75ef7`
   - Repeat for `JWT_SECRET_KEY` (Should be different than APP_SECRET)

3. Initialize the database:
   - Make sure you are within the backend folder: (run `cd backend/`)
   - Run the following commands:
      - `export FLASK_APP=app.py` and `export FLASK_RUN_PORT=5555`
      - `flask db init`
      - `flask db migrate -m 'initial migration'`
      - `flask db upgrade head`
   - Then run `python seed.py` to seed the data

4. Start the server:
   - To start the server, run `python app.py` within the backend folder
