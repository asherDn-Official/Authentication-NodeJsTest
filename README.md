# Node.js Authentication System with Account Locking and Admin Role
This project is a Node.js application implementing user authentication using JWT, with features like account locking after multiple failed login attempts, and an admin role for manually unlocking accounts.

# Features
  -User Registration with password strength validation
  -User Login with:
      -Account locking after 3 failed attempts
      -Automatic unlock after 30 minutes
  -Admin endpoint for unlocking locked accounts
  -JWT-based authentication with cookie sessions
  -Rate limiting to prevent brute-force attacks
  -Input validation for email structure and password strength

# Tech Stack
  -Backend: Node.js, Express
  -Database: MongoDB (with Mongoose)
  -Security: bcryptjs, jsonwebtoken
  -Middleware: cookie-parser, express-rate-limit
  -Validation: validator

# Prerequisites
  -Node.js (v14 or higher)
  -MongoDB (Local instance or MongoDB Atlas for cloud-based database)
  -Git (for version control)

# Getting Started

1. Clone the Repository
  First, clone the project to your local machine:

    git clone https://github.com/<your-username>/<repository-name>.git
    cd <repository-name>
    
2. Install Dependencies
  Run the following command to install the required dependencies:
  
    npm install
3. Create Environment Variables
  Create a .env file in the root directory and set up the environment variables as shown in the .env.example file:

# .env file
    MONGO_URI=your_mongodb_uri
    
    JWT_SECRET=your_jwt_secret_key
    
    JWT_EXPIRES_IN=1d
    
    NODE_ENV=development
    
    PORT=5000
  
  Environment Variables Explanation:
  
  MONGO_URI: The MongoDB connection URI (e.g., mongodb://localhost:27017/auth-system or your MongoDB Atlas URI).

  JWT_SECRET: Secret key for signing JWT tokens. It should be a random and secure string.
  
  JWT_EXPIRES_IN: Duration for which the JWT token is valid (e.g., 1d for 1 day).
  
  NODE_ENV: Set to development for local development and production when deploying to production.
  
  PORT: The port on which the server will run (default is 5000).

4. Run the Application
You can start the application using the following command:

        npm start
Or, if you want to run it in development mode with hot reloading (requires nodemon):

        npm run dev
The server will start on http://localhost:5000.

5. API Endpoints

  1. User Registration

  URL: POST /api/register

  Description: Registers a new user.

  Request Body:

  json:

    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "Password@123"
    }
  Response:

  201: User registered successfully

  400: Email already in use

  422: Invalid email format or password not strong enough

  3. User Login

  URL: POST /api/login

  Description: Logs in a registered user. Returns a cookie with a JWT token.

  Request Body:

  json
    
      {
        "email": "john@example.com",
        "password": "Password@123"
      }
      
  Response:

  200: Login successful

  400: Invalid credentials

  403: Account is locked, try again later

  4. Get User Profile (Protected)

  URL: GET /api/profile

  Description: Returns the profile information of the logged-in user.

  Cookie: The JWT token stored as a cookie

  Response:

  200: User profile data

  401: Unauthorized access

  403: Account is locked

5. Admin Unlock User Account

  URL: PATCH /api/admin/unlock/:userId

  Description: Admins can manually unlock a locked user account.

  Cookie: Admin JWT token

  Response:

  200: Account unlocked successfully

  404: User not found

  403: Only accessible by admin users

# 6. MongoDB Database Setup

  If you are using a local MongoDB instance, ensure MongoDB is installed and running on your system.

  Run mongod to start the MongoDB server.

  If you are using MongoDB Atlas:

  Create a cluster and get the connection string.

  Replace MONGO_URI in your .env file with your MongoDB Atlas URI.

# 7. Running Tests (Optional)
If you've written tests for your application, you can run them with:

    npm test

# 8. Rate Limiting
  The project uses express-rate-limit to prevent brute-force login attacks. The rate limit is set to allow a maximum of 5 login attempts per IP address every 15 minutes.

