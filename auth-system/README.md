# Auth System (demo)

This folder contains a small demo auth system: an Express + MongoDB backend and a Vite + React frontend. It's intended as a runnable example for login/signup using JWTs.

## Backend

Location: `auth-system/backend`

1. Copy `.env.example` to `.env` and set `MONGODB_URI`, `JWT_SECRET`, and optional `PORT`.
2. Install dependencies and run:

```
cd auth-system/backend
npm install
npm run dev
```

By default the server listens on port 5000.

API endpoints:
- POST /auth/signup  { name, email, password }
- POST /auth/login   { email, password }
- GET  /auth/user    (requires Authorization: Bearer <token>)

## Frontend

Location: `auth-system/frontend`

1. Optionally set `VITE_API_URL` in your environment to point to the backend (default: http://localhost:5000).
2. Install & run:

```
cd auth-system/frontend
npm install
npm run dev
```

The frontend runs on port 5173 by default.

## Notes
- This demo stores the JWT in `localStorage` for simplicity. For production, prefer httpOnly cookies with refresh tokens.
- Ensure MongoDB is reachable from `MONGODB_URI`.
# Monga Auth System

This folder contains a small demo authentication system (backend + frontend) using Node.js, Express, MongoDB and React (Vite).

Folder structure

```
auth-system/
  backend/
    package.json
    .env.example
    src/
      index.js
      controllers/authController.js
      models/User.js
      middleware/authMiddleware.js
      routes/auth.js
  frontend/
    package.json
    index.html
    src/
      main.jsx
      App.jsx
      styles.css
      pages/
        Login.jsx
        Signup.jsx
        Dashboard.jsx
      utils/
        auth.js
        PrivateRoute.jsx

```

## Setup (local)

Prerequisites:
- Node.js 18+
- npm
- MongoDB running locally or a connection string

1. Backend

```bash
cd auth-system/backend
cp .env.example .env
# edit .env and set MONGODB_URI and JWT_SECRET
npm install
npm run dev
```

2. Frontend

```bash
cd auth-system/frontend
npm install
npm run dev
```

Open the frontend (defaults to http://localhost:5173) and use the forms.

### API Endpoints
- POST /auth/signup { name, email, password }
- POST /auth/login { email, password }
- GET /auth/user (requires Authorization: Bearer <token>)

### Deployment

Backend: Deploy to Render or Railway; set environment variables `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN` and the start command `npm start`.
Frontend: Deploy to Vercel (static site from Vite build) or Netlify; set `REACT_APP_API_URL` env var to your backend URL.

### Testing with Postman
1. Signup: POST to /auth/signup with JSON body { name, email, password } -> returns token
2. Login: POST to /auth/login { email, password } -> returns token
3. Get user: GET /auth/user with header Authorization: Bearer <token>

Security note: This demo stores tokens in localStorage and uses simple JWT; for production consider httpOnly cookies, refresh tokens, rate limiting, email verification, and secure password policies.
