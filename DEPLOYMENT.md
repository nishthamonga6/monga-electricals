# Deployment & Run Instructions (Frontend + Backend + MongoDB)

This document explains how to run the project locally and deploy the frontend and backend.

## Overview

- Frontend: Next.js app (root of repository). Run with `npm run dev`.
- Backend: Express app located at `auth-system/backend`.
- Database: MongoDB (Atlas recommended in production).

## Local development

1. Start MongoDB (local) or create a free MongoDB Atlas cluster and copy the connection string.

2. Configure backend environment:

   - Create `.env` in `auth-system/backend` with:

     MONGODB_URI=your_mongo_uri
     JWT_SECRET=change_this_secret
     ADMIN_EMAIL=admin@example.com
     ADMIN_PASSWORD=password123

3. Seed data and start backend:

   Open PowerShell in `auth-system/backend`:

```powershell
cd auth-system/backend
npm install
node scripts/seed.js
npm run dev
```

4. Start frontend (project root):

```powershell
npm install
# set API base (optional) - the frontend client reads NEXT_PUBLIC_API_URL
$env:NEXT_PUBLIC_API_URL = "http://localhost:5000"
npm run dev
```

Notes:
- If you don't set `NEXT_PUBLIC_API_URL`, the frontend will call `/products` and `/orders` on the same origin. When developing, it's easiest to set `NEXT_PUBLIC_API_URL` to the backend URL (e.g. http://localhost:5000).

## Deployment suggestions

- Frontend: Deploy to Vercel (recommended for Next.js). Set `NEXT_PUBLIC_API_URL` in Vercel environment variables to your backend URL.
- Backend: Deploy to Render or Railway. Set environment variables (`MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`) on the platform.
- Database: Use MongoDB Atlas and whitelist the backend host or use VPC peering.

## Admin

- After seeding, admin user is created using `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env`.

## What I added

- A minimal Express backend scaffold (in `auth-system/backend`) with product/order models and routes.
- A simple API client (`lib/api.ts`) and minimal frontend pages for cart and checkout.

If you want, I can continue and add a complete admin UI (product CRUD), tests, or richer frontend-product pages. Tell me which you'd prefer next.
