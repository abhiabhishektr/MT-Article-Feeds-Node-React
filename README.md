# Article Feeds Web Application

A full-stack web application for managing and viewing articles, including features like user registration, login, creating, editing, and viewing articles, as well as setting user preferences. The backend is powered by Node.js, Express, and MongoDB, while the frontend is built using React with TypeScript and Vite.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Environment Variables](#environment-variables)
6. [API Documentation](#api-documentation)
7. [Scripts](#scripts)
8. [Contributing](#contributing)
9. [Connect with Me](#connect-with-me)

---

### Getting Started

To get started with this project, ensure you have Node.js and Yarn installed. Clone the repository and install the dependencies for both the backend and frontend.

```bash
# Clone the repository
git clone https://github.com/abhiabhishektr/article-feeds-webapp.git

# Install backend dependencies
cd article-feeds-webapp/backend
yarn install

# Install frontend dependencies
cd ../my-article-app
yarn install
```

### Project Structure

This application is split into a backend and frontend, with the following structure:

```
article-feeds-webapp/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── config/
│   ├── services/
│   ├── utils/
│   ├── .env
│   └── app.ts
├── my-article-app/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── api.ts
│   │   └── types.ts
└── Article Feeds API.postman_collection.json
```

### Backend Setup

The backend is built with Node.js and Express and uses MongoDB as the database. Here is a breakdown of key directories and files:

- **Controllers**: Handles request logic, such as `authController.ts` for authentication, `articleController.ts` for article management, and `userController.ts` for user settings.
- **Models**: Contains MongoDB schemas for `user`, `article`, and `preferences`.
- **Routes**: Defines API routes for authentication (`authRoutes.ts`), articles (`articleRoutes.ts`), and users (`userRoutes.ts`).
- **Middlewares**: Includes rate limiting (`rateLimiter.ts`), JWT authentication (`authMiddleware.ts`), and error handling (`errorHandler.ts`).
- **Config**: Contains configurations for MongoDB and JWT.
- **Services**: Contains reusable service functions, such as `authService.ts` for JWT generation.
- **Utils**: Provides utility functions, such as `validateInputs.ts` for validating inputs.

#### Starting the Backend

1. Create a `.env` file in the `backend` directory and add the following environment variables:

   ```plaintext
   MONGODB_URI=<your_mongoDB_uri>
   JWT_SECRET=<your_jwt_secret>
   PORT
   ```

2. To run the backend:

   ```bash
   # Development
   yarn dev

   # Production
   yarn build
   yarn start
   ```

### Frontend Setup

The frontend is a React application developed with TypeScript, using Vite for fast builds and development.

- **Components**: Reusable components for the UI.
- **Pages**: Contains the main pages, including `ArticleCreationPage.tsx`, `ArticleEditPage.tsx`, `DashboardPage.tsx`, `LoginPage.tsx`, `RegistrationPage.tsx`, and `SettingsPage.tsx`.
- **api.ts**: Centralized API calls to interact with the backend.
- **types.ts**: Defines TypeScript types for shared data structures.

#### Starting the Frontend

1. To run the frontend:

   ```bash
   # Development
   yarn dev

   # Production
   vite build
   vite preview
   ```

### Environment Variables

Create a `.env` file in the root of both `backend` and `frontend` directories as necessary. Backend variables include `DB_URI` and `JWT_SECRET`, while frontend variables can be added depending on your environment setup.

### API Documentation

An API collection file, `Article Feeds API.postman_collection.json`, is included in the root directory for easy testing with Postman. It contains all the primary endpoints for user registration, login, article creation, editing, fetching, and user preferences.

### Scripts

For your convenience, the following scripts are available for both the frontend and backend:

#### Backend

- **yarn dev**: Runs the server in development mode.
- **yarn build**: Compiles TypeScript into JavaScript.
- **yarn start**: Starts the server in production mode.

#### Frontend

- **yarn dev**: Runs the React frontend in development mode.
- **vite build**: Builds the application for production.
- **vite preview**: Previews the production build.

---

### Contributing

If you find this project helpful or have ideas for improvements, please feel free to contribute! Also, give this project a ⭐️ on GitHub if you like it. It helps others discover the project too.

### Connect with Me

- **GitHub**: [@abhiabhishektr](https://github.com/abhiabhishektr)
- **LinkedIn**: [@abhiabhishektr](https://www.linkedin.com/in/abhiabhishektr)

