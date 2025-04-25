# StudyBuddy

## Study smarter, together!

Have you ever thought: Man, it sure would be nice if I could discuss that difficult topic from lecture 5 with someone! Well now you can use StudyBuddy to organise study sessions with like-minded peers!

This is an ongoing project developed by Angus Wong initially for IFN666 Web and Mobile Application Development at the Queensland University of Technology.

#### Updates

24/04: Added admin panel to view all registered users. Admin can already modify or delete any users.

19/04: The web application is fully developed and ready for deployment. Documentation will be updated soon. The application is being hosted on a test server on https://n11941073.ifn666.com/StudyBuddy (Not available 24/7 currently).

---

### 🔐 Role-Based Access Control (RBAC)

| Feature / Action             | User 👤 | Moderator 🛡️ | Admin 👑 |
| ---------------------------- | :-----: | :----------: | :------: |
| View study sessions          |   ✅    |      ✅      |    ✅    |
| Create study sessions        |   ✅    |      ✅      |    ✅    |
| Edit own study sessions      |   ✅    |      ✅      |    ✅    |
| Delete own study sessions    |   ✅    |      ✅      |    ✅    |
| Edit _any_ session           |   ❌    |      ✅      |    ✅    |
| Delete _any_ session         |   ❌    |      ✅      |    ✅    |
| Comment on sessions          |   ✅    |      ✅      |    ✅    |
| Edit/delete own comments     |   ✅    |      ✅      |    ✅    |
| Edit/delete _any_ comment    |   ❌    |      ✅      |    ✅    |
| Access AdminPage             |   ❌    |      ❌      |    ✅    |
| Edit or delete users         |   ❌    |      ❌      |    ✅    |
| View all users (Admin panel) |   ❌    |      ❌      |    ✅    |

✅ = Allowed  
❌ = Not allowed

### How to run API

To test this web app on your local device, simply download the source code
`git clone https://github.com/wongy123/StudyBuddy.git`

Ensure you have Node.js installed.
[Node.js](https://nodejs.org/en)

Go into the working directory

`cd StudyBuddy`

Install the dependencies

`cd server`

`npm install`

Create a file called `.env`

Inside this file, write `JWT_SECRET={YOUR_KEY}` and replace `{YOUR_KEY}` with your own JWT secret key.

Create admin user

`npm run createAdmin -- <userName> <email> <password>`

Create moderator user

`npm run createMod -- <userName> <email> <password>`

Run the server

`node server.js`

You can also test the API by importing the **Hoppscotch_env_StudyBuddy.json** file into Hoppscotch environment, then import **Hoppscotch_StudyBuddyAPI.json** into collections, and run the collection.

**If you want to run the HoppScotch API tests, make sure you create an admin account with the following command first**

**`npm run createAdmin -- adminUser adminuser@example.com password`**

_As of 24/04, the Hoppscotch tests are updated, and the Postman tests are outdated and will not test all end points._

---

### 📚 StudyBuddy API Endpoints Documentation

#### 🧑‍💼 Auth (`/api/auth`)

| Method | Route       | Description              | Access   |
|--------|-------------|--------------------------|----------|
| POST   | `/register` | Register a new user      | Public   |
| POST   | `/login`    | Log in a user            | Public   |
| POST   | `/logout`   | Log out the current user | Public   |



#### 👥 Users (`/api/users`)

| Method | Route   | Description         | Access              |
|--------|---------|---------------------|---------------------|
| GET    | `/`     | Get all users       | Admin only          |
| GET    | `/:id`  | Get user by ID      | Authenticated users |
| PUT    | `/:id`  | Update user         | Owner or Admin      |
| DELETE | `/:id`  | Delete user         | Owner or Admin      |



#### 📆 Study Sessions (`/api/sessions`)

| Method | Route               | Description                                 | Access                    |
|--------|---------------------|---------------------------------------------|---------------------------|
| GET    | `/`                 | List all sessions (supports search/sort)    | Public                    |
| POST   | `/`                 | Create a new session                        | Authenticated users       |
| GET    | `/joined/:userId`   | Get sessions a user has joined              | Authenticated users       |
| GET    | `/:id`              | Get a session by ID                         | Authenticated users       |
| PUT    | `/:id`              | Update a session                            | Owner or Moderator/Admin  |
| DELETE | `/:id`              | Delete a session                            | Owner or Moderator/Admin  |
| POST   | `/:id/join`         | Join a session                              | Authenticated users       |
| POST   | `/:id/leave`        | Leave a session                             | Authenticated users       |



#### 💬 Comments (`/api/sessions/:sessionId/comments`)

| Method | Route     | Description                  | Access                    |
|--------|-----------|------------------------------|---------------------------|
| GET    | `/`       | List all comments for session| Authenticated users       |
| POST   | `/`       | Create a new comment         | Authenticated users       |
| GET    | `/:id`    | Get a comment by ID          | Authenticated users       |
| PUT    | `/:id`    | Update a comment             | Owner or Moderator/Admin  |
| DELETE | `/:id`    | Delete a comment             | Owner or Moderator/Admin  |



#### 🗓️ QUT Events (`/api/qut-events`)

| Method | Route | Description              | Access |
|--------|-------|--------------------------|--------|
| GET    | `/`   | Get upcoming QUT events  | Public |



##### ✅ Notes

- All authenticated routes require a valid JWT token in the `Authorization` header.
- Owner-based routes use user ID matching (`req.user.id === resource.userId`).
- `Moderator` and `Admin` users can access and manage other users' content where noted.

---

### How to run Front-End

Go into the working directory

`cd StudyBuddy`

Install the dependencies

`cd client`

`npm install`

The front-end React app is configured to be deployed under the /StudyBuddy path in production.

In development mode, this restriction does not apply.

To test the web app in development mode, ensure you already have the API running on port `4000`, then start the front-end

`npm run dev`

This will launch the React app locally (usually at http://localhost:5173), and it will proxy API requests to your backend on port 4000.

If you wish to expose the React app to your local network, you can run

`npm run dev --host`

Other devices on your local network can now access the React app via http://`server's local ip`:5173
