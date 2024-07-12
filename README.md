# Journal App

This is a simple journal app that allows users to add, edit, delete, and view journal entries. The app consists of a frontend built with React Native and a backend built with Express.js and MongoDB.

## Table of Contents

- [Journal App](#journal-app)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
  - [Running the App](#running-the-app)

## Requirements

- Node.js
- npm or yarn
- MongoDB
- Expo CLI (for running the React Native app)

## Frontend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/agwadan/thera-notes.git
   cd frontend
   ```

2. **Install Dependencies**

`npm install` or `yarn`

2. **Run the App**
   `expo start`

## Backend Setup

1. **Navigate to Backend Directory**
   `cd backend`
2. **Install Dependencies**

`npm install` or `yarn`

2. **Set up environment variables:**

- Create a .env file in the backend directory and add the following environment variables:

```
PORT=3000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

3. **Run the server:**

`npm start` or `yarn start`
