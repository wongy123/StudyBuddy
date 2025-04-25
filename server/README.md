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
JWT_SECRET=your_jwt_secret
```

Change `your_jwt_secret` to your own key

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

See the full endpoint documentation in the [API Endpoint Documentation](#📄-api-endpoint-documentation) section below.

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
├── API-collection.json     # Hoppscotch collection (Requires /src/tests/Hoppscotch/Hoppscotch_env_StudyBuddy.json to be imported first)
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

---

### 📋 Full API Endpoint Documentation

| Method | Route                                 | Description         | Access             | Request Body                                                            | Response                                        |
| ------ | ------------------------------------- | ------------------- | ------------------ | ----------------------------------------------------------------------- | ----------------------------------------------- |
| POST   | /api/auth/register                    | Register a new user | Public             | { userName, displayName?, email, password, degree, profileBio? }        | { success, data: userObj }                      |
| POST   | /api/auth/login                       | Login a user        | Public             | { email, password }                                                     | { success, token, user }                        |
| POST   | /api/auth/logout                      | Logout              | Public             | None                                                                    | { success, message }                            |
| GET    | /api/users/                           | Get all users       | Admin              | None                                                                    | { success, count, data: users }                 |
| GET    | /api/users/:id                        | Get user by ID      | Authenticated      | None                                                                    | { success, data: user }                         |
| PUT    | /api/users/:id                        | Update user         | Owner or Admin     | Editable fields (excluding role, password, email, userName)             | { success, data: updatedUser }                  |
| DELETE | /api/users/:id                        | Delete user         | Owner or Admin     | None                                                                    | 204 No Content                                  |
| GET    | /api/sessions                         | List all sessions   | Public             | Query: ?search=&sort=asc/desc&page=&limit=                              | Paginated list of sessions                      |
| POST   | /api/sessions                         | Create session      | Authenticated      | { title, description, courseCode?, date, startTime, endTime, location } | 201 Created, session object                     |
| GET    | /api/sessions/:id                     | Get session by ID   | Authenticated      | None                                                                    | session object                                  |
| PUT    | /api/sessions/:id                     | Update session      | Owner or Mod/Admin | Same fields as create                                                   | { success, data: updatedSession }               |
| DELETE | /api/sessions/:id                     | Delete session      | Owner or Mod/Admin | None                                                                    | 204 No Content                                  |
| POST   | /api/sessions/:id/join                | Join a session      | Authenticated      | None                                                                    | { success, message, data: session }             |
| POST   | /api/sessions/:id/leave               | Leave a session     | Authenticated      | None                                                                    | { success, message, data: session }             |
| GET    | /api/sessions/joined/:userId          | Get joined sessions | Authenticated      | None                                                                    | { success, data, page, totalPages, totalItems } |
| GET    | /api/sessions/:sessionId/comments     | List comments       | Authenticated      | None                                                                    | { status, results, data: { comments } }         |
| POST   | /api/sessions/:sessionId/comments     | Create comment      | Authenticated      | { content }                                                             | { success, data: savedComment }                 |
| GET    | /api/sessions/:sessionId/comments/:id | Get comment by ID   | Authenticated      | None                                                                    | { success, data: comment }                      |
| PUT    | /api/sessions/:sessionId/comments/:id | Update comment      | Owner or Mod/Admin | { content }                                                             | { success, data: updatedComment }               |
| DELETE | /api/sessions/:sessionId/comments/:id | Delete comment      | Owner or Mod/Admin | None                                                                    | 204 No Content                                  |
| GET    | /api/qut-events                       | Get QUT events      | Public             | None                                                                    | { success, count, data: events[] }              |

---

### ✅ Input Validation

All input data submitted to the API is validated and sanitised using `express-validator`. Below are the rules for each route group.

### 🧑‍💼 Auth (User Registration/Login)

#### Register `/api/auth/register`

| Field       | Required | Type   | Validation Rules                               |
| ----------- | -------- | ------ | ---------------------------------------------- |
| userName    | Yes      | String | 3–30 characters, alphanumeric/underscores only |
| displayName | No       | String | Max 50 characters                              |
| email       | Yes      | String | Must be valid email format                     |
| password    | Yes      | String | Minimum 8 characters                           |
| degree      | Yes      | String | Max 100 characters                             |
| profileBio  | No       | String | Max 500 characters                             |

#### Login `/api/auth/login`

| Field    | Required | Type   | Validation Rules      |
| -------- | -------- | ------ | --------------------- |
| email    | Yes      | String | Must be a valid email |
| password | Yes      | String | Not empty             |

### 👥 User Profile

#### Update `/api/users/:id`

| Field       | Required | Type   | Validation Rules              |
| ----------- | -------- | ------ | ----------------------------- |
| displayName | Optional | String | Not empty, max 50 characters  |
| degree      | Optional | String | Not empty, max 100 characters |
| profileBio  | Optional | String | Max 500 characters            |

_Note: Fields like `userName`, `email`, `role`, and `password` cannot be changed._

### 📆 Study Sessions

#### Create `/api/sessions` (POST)

| Field       | Required | Type   | Validation Rules                             |
| ----------- | -------- | ------ | -------------------------------------------- |
| title       | Yes      | String | Not empty, max 100 characters                |
| description | Yes      | String | Not empty, max 1000 characters               |
| courseCode  | No       | String | Max 20 characters                            |
| date        | Yes      | Date   | Must be ISO8601 formatted (e.g., 2025-05-15) |
| startTime   | Yes      | String | Format: HH:mm (24-hour, e.g., 14:30)         |
| endTime     | Yes      | String | Format: HH:mm (24-hour, e.g., 16:00)         |
| location    | Yes      | String | Not empty, max 200 characters                |

#### Update `/api/sessions/:id` (PUT)

Same fields as above, all optional. When provided:

- `title`, `description`, `location` must be non-empty
- `startTime`, `endTime` must match 24-hour HH:mm format
- `date` must be ISO8601

### 💬 Comments

#### Create/Update `/api/sessions/:sessionId/comments`

| Field   | Required | Type   | Validation Rules              |
| ------- | -------- | ------ | ----------------------------- |
| content | Yes      | String | Not empty, max 500 characters |

### 🌐 Pagination

Applied via query parameters on list endpoints like `/sessions` and `/sessions/:id/comments`.

| Query Param | Required | Type   | Validation Rules                  |
| ----------- | -------- | ------ | --------------------------------- |
| page        | No       | Number | Must be positive integer          |
| limit       | No       | Number | Must be positive integer (max 10) |

All validation errors are returned in the following format:

```json
{
  "success": false,
  "errors": [
    {
      "msg": "Field X is required",
      "param": "fieldName",
      "location": "body"
    }
  ]
}
```

---

### ✅ Notes

- All authenticated routes require a valid JWT token in the Authorization header.
- Owner access is verified via `req.user._id === resource.ownerId`.
- Moderator and Admin users can manage others' content.
- Pagination is available via `?page=1&limit=10`.
- Search supports partial matches on `title`, `description`, and `courseCode`.
- Sort by date using `?sort=asc` or `?sort=desc`.
