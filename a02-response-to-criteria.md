# IFN666_25se1 Assessment 02 Submission

**Student name:** Man Shing (Angus) Wong

**Student ID:** n11941073

# Response to marking criteria

## (API) Core: Application architecture (1 mark)

- **One line description:**
  Implemented a layered architecture with separate folders for routes, controllers, models, and middleware. `server.js` is the entry point.

- **Video timestamp:**
  04:55

- **Relevant files**
  - server.js
  - src/controllers/
  - src/models/
  - src/routes/
  - src/middleware/
  - package.json
  - README.md
  - API-collection.json

## (API) Core: Endpoints (2 marks)

- **One line description:**
  REST API built with Express, supporting over 15 endpoints across Users, Study Sessions, and Comments with appropriate HTTP methods and nested routes.

- **Video timestamp:**
  05:55
- **Relevant files**
  - src/routes/userRoutes.js
  - src/routes/studySessionRoutes.js
  - src/routes/authRoutes.js
  - src/routes/qutEventRoutes.js
  - src/routes/commentRoutes.js
  - src/routes/index.js

## (API) Core: Data model (3 marks)

- **One line description:**
  Mongoose schemas include Users, Study Sessions, and Comments with one-to-many relationships and references between collections.

- **Video timestamp:**
  06:25

- **Relevant files**
  - src/models/User.js
  - src/models/StudySession.js
  - src/models/Comment.js

## (API) Core: Data interface (3 marks)

- **One line description:**
  Used controller functions to connect models to routes with encapsulated business logic for CRUD operations.

- **Video timestamp:**
  06:50

- **Relevant files**
  - src/controllers/userController.js
  - src/controllers/studySessionController.js
  - src/controllers/commentController.js
  - src/controllers/authController.js
  - src/controllers/qutEventController.js

## (API) Core: Deployment to web server (3 marks)

- **One line description:**
  Deployed API to production using Caddy with subdomain routing configured to https://n11941073.ifn666.com/StudyBuddy/api

- **Video timestamp:**
  04:43

- **Relevant files**
  - Caddyfile

## (API) Core: API testing with Hoppscotch (3 marks)

- **One line description:**
  API endpoints tested with Hoppscotch; collection exported and included in submission.

- **Video timestamp:**
  09:15

- **Relevant files**
  - API-collection.json

## (API) Additional: Authentication (3 marks)

- **One line description:**
  Implemented JWT-based authentication for protected endpoints, with register/login/logout routes.

- **Video timestamp:**
  01:00

- **Relevant files**
  - src/controllers/authController.js
  - src/routes/authRoutes.js
  - src/middleware/authenticateWithJwt.js
  - src/models/User.js

## (API) Additional: Input validation (3 marks)

- **One line description:**
  Used express-validator and custom middleware to validate incoming user/session/comment data with detailed error handling.

- **Video timestamp:**
  06:10

- **Relevant files**
  - src/validators/validateUser.js
  - src/validators/validateSession.js
  - src/validators/validateComment.js
  - src/middleware/validateJSON.js

## (API) Additional: Query filtering (3 marks)

- **One line description:**
  Enabled search and sort functionality on session listings by title, description, and course code, using flexible query parameters.

- **Video timestamp:**
  00:34

- **Relevant files**
  - src/controllers/studySessionController.js
  - src/routes/studySessionRoutes.js
  - src/validators/validatePaginateQueryParams.js

## (API) Additional: Pagination (3 marks)

- **One line description:**
  Integrated Mongoose pagination for all list endpoints, including session and comment listings, with standardised query support.

- **Video timestamp:**
  00:25

- **Relevant files**
  - src/controllers/studySessionController.js
  - src/controllers/commentController.js
  - src/models/StudySession.js
  - src/models/Comment.js
  - src/validators/validatePaginateQueryParams.js

## (API) Additional: Role-based Access Control (3 marks)

- **One line description:**
  Users are assigned roles (user, moderator, admin); access to certain routes is controlled with custom RBAC middleware.

- **Video timestamp:**
  02:00

- **Relevant files**
  - src/middleware/adminAccess.js
  - src/middleware/ownerOrAdmin.js
  - src/middleware/ownerOrModmin.js
  - src/models/User.js

---

## (Client) Core: Application architecture (3 marks)

- **One line description:**
  Modular React app using vite, react-router, and environment-specific base paths for deployment.

- **Video timestamp:**
  07:00

- **Relevant files**
  - client/vite.config.js
  - client/src/routes/index.jsx
  - client/src/main.jsx

## (Client) Core: User interface design (3 marks)

- **One line description:**
  Clean and intuitive interface using Material UI, applying 60/30/10 colour rule, mobile-first layout, and consistent font styling.

- **Video timestamp:**
  00:00

- **Relevant files**
  - client/src/pages/HomePage.jsx
  - client/src/components/SessionCard.jsx

## (Client) Core: React components (3 marks)

- **One line description:**
  Built reusable components like SessionCard, CommentBox, and inline editing components for both session and comment data.

- **Video timestamp:**
  01:45

- **Relevant files**
  - client/src/components/SessionCard.jsx
  - client/src/pages/StudySession/StudySessionDetails/Edit/EditSessionForm.jsx
  - client/src/pages/StudySession/StudySessionDetails/Comments/CommentItem.jsx

## (Client) Core: State management (3 marks)

- **One line description:**
  Local state managed via useState and shared user/auth state via UserContext.

- **Video timestamp:**
  01:45

- **Relevant files**
  - client/src/context/UserContext.jsx
  - client/src/pages/StudySession/StudySessionDetails/index.jsx

## (Client) Core: API integration (3 marks)

- **One line description:**
  Integrated with own Express backend for sessions, authentication, and comments using fetch and dynamic query strings.

- **Video timestamp:**
  00:00

- **Relevant files**
  - client/src/utils/api.js
  - client/src/pages/HomePage.jsx
  - client/src/pages/Auth/LoginForm.jsx

## (Client) Additional: Authentication (3 marks)

- **One line description:**
  Implemented JWT-based authentication with role-based access and protected routes.

- **Video timestamp:**
  01:00

- **Relevant files**
  - client/src/context/UserContext.jsx
  - client/src/pages/Auth/LoginForm.jsx
  - client/src/routes/ProtectedRoute.jsx

## (Client) Additional: Input validation (3 marks)

- **One line description:**
  Implemented frontend form validation with clear error messages using MUI and React state.

- **Video timestamp:**
  01:15

- **Relevant files**
  - client/src/pages/Auth/RegisterForm.jsx
  - client/src/pages/StudySession/StudySessionDetails/Comments/CommentForm.jsx

## (Client) Additional: Search and Sort (3 marks)

- **One line description:**
  Server-side and client-side filtering and sorting of study sessions by title, course, date, and participant count.

- **Video timestamp:**
  00:34

- **Relevant files**
  - client/src/pages/HomePage.jsx
  - client/src/components/SearchBar.jsx

## (Client) Additional: Pagination (3 marks)

- **One line description:**
  Implemented server-side pagination using query parameters and custom pagination controls in the UI.

- **Video timestamp:**
  00:25

- **Relevant files**
  - client/src/pages/HomePage.jsx
  - client/src/components/PaginationControls.jsx

## (Client) Additional: Responsive design (3 marks)

- **One line description:**
  Mobile-first layout using Material UI’s Grid v2 with breakpoints and responsive font sizing.

- **Video timestamp:**
  03:45

- **Relevant files**
  - client/src/pages/Profile/ViewProfile/index.jsx
  - client/src/pages/HomePage.jsx
  - client/src/components/SessionCard.jsx
