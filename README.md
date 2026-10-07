# Full Stack Deploy Practice

A very small full-stack project made for practicing deployment.

## Stack

- Frontend: React + Vite
- Admin: React + Vite
- Backend: Node.js + Express
- Database: MySQL
- Local database manager: phpMyAdmin

## What the project does

Public frontend:
- Shows products from MySQL through the backend API.

Admin panel:
- Add products
- Edit products
- Delete products

Backend:
- REST API for CRUD operations.

Database:
- `database.sql` creates the database and `products` table with sample data.

## Project structure

```text
fullstack-deploy-practice/
├── frontend/
├── admin/
├── backend/
└── database.sql
```

## 1. Import database

Open phpMyAdmin.

Create/import using `database.sql`.

The SQL file creates:

```text
Database: deploy_practice
Table: products
```

## 2. Start backend

```bash
cd backend
npm install
```

Copy:

```text
.env.example
```

to:

```text
.env
```

Update your MySQL values if necessary.

Then:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

Test:

```text
http://localhost:5000/api/products
```

## 3. Start frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Default Vite URL:

```text
http://localhost:5173
```

## 4. Start admin

Open another terminal:

```bash
cd admin
npm install
npm run dev
```

Vite will normally use another port such as:

```text
http://localhost:5174
```

## Environment variables

Frontend `.env`

```text
VITE_API_URL=http://localhost:5000
```

Admin `.env`

```text
VITE_API_URL=http://localhost:5000
```

Backend `.env`

```text
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=deploy_practice
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

## Deployment concept

```text
Frontend
   |
   | HTTP API
   v
Backend
   |
   | SQL
   v
MySQL

Admin
   |
   | HTTP API
   v
Backend
```

When deploying:

1. Deploy MySQL.
2. Put live MySQL credentials into backend environment variables.
3. Deploy backend.
4. Copy backend live URL.
5. Put backend URL into `VITE_API_URL` for frontend and admin.
6. Deploy frontend.
7. Deploy admin.
8. Add deployed frontend/admin URLs to backend CORS environment variables.
