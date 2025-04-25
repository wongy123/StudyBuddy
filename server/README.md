# 📚 StudyBuddy Backend API

StudyBuddy is a collaborative platform that helps students create and join study sessions. This Express-based RESTful API provides full functionality including authentication, role-based access control, and event aggregation from external sources like QUT.

---

## 🎯 Purpose of the Application

The backend API powers the StudyBuddy platform, supporting users, study sessions, comments, and integration with QUT events. It offers protected endpoints with role-based access and real-time data management with MongoDB.

---

## 🚀 How to Run the API

### Clone the Repository

```bash
git clone https://github.com/wongy123/StudyBuddy.git
cd StudyBuddy/server
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file with the following:

```ini
MONGO_URI=mongodb://localhost:27017/studybuddy
JWT_SECRET=your_jwt_secret
```

### Create Admin User

```bash
npm run createAdmin -- <userName> <email> <password>
```

### Create Moderator User

```bash
npm run createMod -- <userName> <email> <password>
```

### Start the Server

```bash
node server.js
```

---

## 🔑 Features

- RESTful API with layered architecture
- JWT-based authentication
- Role-based access control (User, Moderator, Admin)
- Input validation with express-validator
- Pagination & query filtering
- External event scraping from QUT website
- Modular routes and controller logic

---

## 🧱 API Endpoints

See the full endpoint documentation in the [API Endpoints](#📄-api-endpoint-documentation) section below.

---

## 🧑‍💼 How to Contribute

1. Fork the repository and create your feature branch.
2. Write clean, modular code following the existing structure.
3. Submit a pull request with a clear explanation of changes.

---

## 🥉 Dependencies

### Runtime Dependencies

- bcrypt (^5.1.1)
- cheerio (^1.0.0)
- cors (^2.8.5)
- dotenv (^16.4.7)
- express (^4.21.2)
- express-async-handler (^1.2.0)
- express-validator (^7.2.1)
- jsonwebtoken (^9.0.2)
- mongoose (^8.13.1)
- mongoose-paginate-v2 (^1.9.0)

### Development Dependencies

- nodemon (^3.1.9)

```bash
npm install
```

---

## 🧱🧡 Application Architecture

```bash
server/
├── server.js               # Entry point
├── package.json
├── .env
├── README.md
├── API-collection.json     # Hoppscotch collection
└── src
    ├── controllers         # Business logic
    ├── middleware          # Custom middleware
    ├── models              # Mongoose schemas
    └── routes              # Express routes
```

---

## 🐞 How to Report Issues

Please submit issues via GitHub Issues:
[https://github.com/wongy123/StudyBuddy/issues](https://github.com/wongy123/StudyBuddy/issues)

Include steps to reproduce, expected vs actual behavior, and relevant environment details.

---

## 📄 API Endpoint Documentation

### 🔐 Role-Based Access Control (RBAC)

| Feature / Action             | User 👤 | Moderator 🛡️ | Admin 👑 |
| ---------------------------- | :-----: | :----------: | :------: |
| View study sessions          |   ✅    |      ✅      |    ✅    |
| Create study sessions        |   ✅    |      ✅      |    ✅    |
| Edit own study sessions      |   ✅    |      ✅      |    ✅    |
| Delete own study sessions    |   ✅    |      ✅      |    ✅    |
| Edit any session             |   ❌    |      ✅      |    ✅    |
| Delete any session           |   ❌    |      ✅      |    ✅    |
| Comment on sessions          |   ✅    |      ✅      |    ✅    |
| Edit/delete own comments     |   ✅    |      ✅      |    ✅    |
| Edit/delete any comment      |   ❌    |      ✅      |    ✅    |
| Access AdminPage             |   ❌    |      ❌      |    ✅    |
| Edit or delete users         |   ❌    |      ❌      |    ✅    |
| View all users (Admin panel) |   ❌    |      ❌      |    ✅    |

### 🧑‍💼 Auth (`/api/auth`)

| Method | Route     | Description         | Access |
| ------ | --------- | ------------------- | ------ |
| POST   | /register | Register a new user | Public |
| POST   | /login    | Log in a user       | Public |
| POST   | /logout   | Log out the user    | Public |

### 👥 Users (`/api/users`)

| Method | Route | Description    | Access         |
| ------ | ----- | -------------- | -------------- |
| GET    | /     | Get all users  | Admin only     |
| GET    | /:id  | Get user by ID | Authenticated  |
| PUT    | /:id  | Update user    | Owner or Admin |
| DELETE | /:id  | Delete user    | Owner or Admin |

### 📆 Study Sessions (`/api/sessions`)

| Method | Route           | Description                | Access             |
| ------ | --------------- | -------------------------- | ------------------ |
| GET    | /               | List all sessions          | Public             |
| POST   | /               | Create a session           | Authenticated      |
| GET    | /joined/:userId | Get user's joined sessions | Authenticated      |
| GET    | /:id            | Get a session by ID        | Authenticated      |
| PUT    | /:id            | Update session             | Owner or Mod/Admin |
| DELETE | /:id            | Delete session             | Owner or Mod/Admin |
| POST   | /:id/join       | Join a session             | Authenticated      |
| POST   | /:id/leave      | Leave a session            | Authenticated      |

### 💬 Comments (`/api/sessions/:sessionId/comments`)

| Method | Route | Description               | Access             |
| ------ | ----- | ------------------------- | ------------------ |
| GET    | /     | List comments for session | Authenticated      |
| POST   | /     | Create a new comment      | Authenticated      |
| GET    | /:id  | Get a comment by ID       | Authenticated      |
| PUT    | /:id  | Update a comment          | Owner or Mod/Admin |
| DELETE | /:id  | Delete a comment          | Owner or Mod/Admin |

### 🗓️ QUT Events (`/api/qut-events`)

| Method | Route | Description             | Access |
| ------ | ----- | ----------------------- | ------ |
| GET    | /     | Get upcoming QUT events | Public |

---

## ✅ Notes

- All authenticated routes require a valid JWT token in the Authorization header.
- Owner-based routes use user ID matching (`req.user.id === resource.userId`).
- Moderator and Admin users can access and manage other users' content where noted.
