Flatiron Hackonomics 2024

Team 10 The Ledger Ends

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
