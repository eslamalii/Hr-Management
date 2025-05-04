# HR Management API

## 📁 Folder Structure

```
.
├── prisma
│   ├── migrations
│   ├── schema.prisma
│   └── seed.ts
├── src
│   ├── app.ts
│   ├── server.ts
│   ├── config
│   ├── constants
│   ├── controllers
│   ├── dtos
│   ├── lib
│   ├── middleware
│   ├── repositories
│   ├── routes
│   ├── services
│   ├── types
│   └── utils
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

## 📝 Overview

This is a TypeScript‑based REST API for HR management.  
• User registration & authentication  
• Profile management (with Cloudinary uploads)  
• Daily attendance processing (cron)  
• Leave & hour request workflows  
• Admin dashboards & stats

## 🚀 Installation

```sh
npm i
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

## 🏃‍♂️ Running

Development:

```sh
npm run dev
```

Build & start:

```sh
npm run build
npm start
```

Docker:

```sh
docker-compose up --build
```

## 📦 API Endpoints

Base URL: `http://localhost:3001/api`

### Auth

- POST `/auth/register` … Register new user
- POST `/auth/login` … Login and get JWT
- PATCH `/auth/change-password` … Change own password
- PATCH `/auth/users/:userId/profile` … Update user profile (Admin only)

### Users

- GET `/users` … List all users (Admin)
- POST `/users` … Create user (Admin)
- GET `/users/:userId` … Get user by ID (Admin)
- GET `/users/:userId/requests` … Get leave/hour requests (Admin/User)
- PUT `/users/:id` … Update own profile
- DELETE `/users/:id` … Delete user (Admin)

### Attendance

- GET `/attendance/daily` … View daily attendance (Admin)

### Leave Requests

- POST `/leave-requests/:userId` … Submit leave request
- GET `/leave-requests/pending` … List pending requests (Admin)
- GET `/leave-requests/user/:userId` … List user’s requests
- PATCH `/leave-requests/:requestId/approve` … Approve request (Admin)
- PATCH `/leave-requests/:requestId/reject` … Reject request (Admin)

### Hour Requests

- POST `/hour-requests/users/:userId` … Submit hour request
- GET `/hour-requests/users/:userId` … List user’s hour requests
- GET `/hour-requests` … List all hour requests (Admin)
- PATCH `/hour-requests/:requestId/approve` … Approve hour request (Admin)
- PATCH `/hour-requests/:requestId/reject` … Reject hour request (Admin)

### Stats

- GET `/stats/requests` … Get counts of leave/hour requests (Admin)

## 🛡 Error Handling & Validation

All routes use Express‑Validator and custom middleware. Errors are formatted via the central `errorHandler`.

## 📄 License

This project is licensed under the MIT License.
