# BookHive

[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue)](./LICENSE)

BookHive is a full-stack online bookstore application designed for book enthusiasts to browse, purchase, and manage their favorite titles. With a sleek, responsive interface and secure user authentication, BookHive offers a seamless shopping experience powered by modern web technologies.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Authentication](#authentication)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [FAQ](#faq)
- [License](#license)

## Features
- **Secure User Authentication**: Register and log in with JWT-based authentication.
- **Book Catalog**: Browse books with details like title, author, price, and description.
- **Shopping Cart**: Add books to a cart and proceed to checkout.
- **Responsive Design**: Optimized for desktop and mobile using Tailwind CSS.
- **Search Functionality**: Search books by title or category (partially implemented).

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Supports Vercel (frontend) and Render (backend)

## Authentication
BookHive leverages JSON Web Tokens (JWT) for secure user authentication. When a user registers or logs in, the backend generates a JWT, which is stored client-side and sent in the `Authorization` header for protected routes (e.g., `/api/cart`, `/api/user`). The `middleware/auth.js` file validates tokens to ensure only authorized users access restricted features. JWT secrets are configured via environment variables for enhanced security.

## Installation
Follow these steps to set up BookHive locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dynagod/BookHive.git
   cd BookHive
   ```

2. **Set up the backend**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in `backend/` with:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```
     Replace `your_mongodb_connection_string` with a MongoDB Atlas URI or local MongoDB URI, and `your_jwt_secret` with a secure random string.
   - Start the backend server:
     ```bash
     npm start
     ```
     The server will run on `http://localhost:5000`.

3. **Set up the frontend**:
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in `frontend/` with:
     ```
     REACT_APP_API_URL=http://localhost:5000/api
     ```
   - Start the frontend development server:
     ```bash
     npm start
     ```
     The app will open at `http://localhost:3000`.

4. **Set up MongoDB**:
   - Use MongoDB Atlas (recommended) or install MongoDB locally.
   - Ensure the `MONGO_URI` in `backend/.env` points to your MongoDB instance.

**Troubleshooting**:
- Ensure MongoDB is running before starting the backend.
- If `npm start` fails, check for missing `.env` files or incorrect ports.

## Usage
- Open `http://localhost:3000` in your browser to access BookHive.
- Register a new account or log in to explore features.
- Browse books, add them to your cart, or update your profile.
- Test the API using Postman or curl with endpoints like:
  - `GET http://localhost:5000/api/books`: Fetch all books
  - `POST http://localhost:5000/api/auth/register`: Register a user
  - `POST http://localhost:5000/api/cart`: Add a book to the cart (requires JWT)

Example API request:
```bash
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com","password":"securepassword"}'
```

## Project Structure
```
BookHive/
├── backend/
│   ├── config/            # Database configuration
│   ├── controllers/       # API route handlers
│   ├── models/            # MongoDB schemas (User, Book, Cart)
│   ├── routes/            # Express API routes
│   ├── middleware/        # Authentication middleware
│   ├── .env               # Environment variables
│   └── server.js          # Backend entry point
├── frontend/
│   ├── src/
│   │   ├── components/    # React components (Navbar, BookCard, etc.)
│   │   ├── pages/         # Page components (Home, Login, Cart)
│   │   ├── assets/        # Images and static files
│   │   ├── App.js         # Main React app component
│   │   └── index.js       # Frontend entry point
│   ├── public/            # Static assets
│   ├── .env               # Frontend environment variables
│   └── package.json       # Frontend dependencies
├── .gitignore            # Git ignore file
└── README.md             # This file
```

## Contributing
We welcome contributions to enhance BookHive! To contribute:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request with a detailed description.

**Guidelines**:
- Follow ESLint rules for JavaScript/React code.
- Write tests for new backend features (see `backend/controllers/`).
- Ensure responsiveness for frontend changes.

## FAQ
**Q: Why am I getting a MongoDB connection error?**  
A: Verify your `MONGO_URI` in `backend/.env`. Ensure MongoDB is running or your Atlas cluster is accessible.

**Q: How do I generate a secure `JWT_SECRET`?**  
A: Use a random string generator or a command like `openssl rand -base64 32` to create a secure key.

**Q: Why is the frontend not connecting to the backend?**  
A: Check that `REACT_APP_API_URL` in `frontend/.env` matches the backend's URL (`http://localhost:5000/api`).

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.