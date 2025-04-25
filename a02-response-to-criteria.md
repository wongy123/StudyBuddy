# IFN666_25se1 Assessment 02 Submission

**Student name:** Man Shing (Angus) Wong

**Student ID:** n11941073

# Response to marking criteria

## (API) Core: Application architecture (1 mark)

- **One line description:**
  Implemented a layered architecture with separate folders for routes, controllers, models, and middleware. `server.js` is the entry point.

- **Video timestamp:**
  _[To be completed by student]_

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
  _[To be completed by student]_

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
  _[To be completed by student]_

- **Relevant files**
  - src/models/User.js
  - src/models/StudySession.js
  - src/models/Comment.js

## (API) Core: Data interface (3 marks)

- **One line description:**
  Used controller functions to connect models to routes with encapsulated business logic for CRUD operations.

- **Video timestamp:**
  _[To be completed by student]_

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
  _[To be completed by student]_

- **Relevant files**
  - Caddyfile


## (API) Core: API testing with Hoppscotch (3 marks)

- **One line description:**
  API endpoints tested with Hoppscotch; collection exported and included in submission.

- **Video timestamp:**
  _[To be completed by student]_

- **Relevant files**
  - API-collection.json


## (API) Additional: Authentication (3 marks)

- **One line description:**
  Implemented JWT-based authentication for protected endpoints, with register/login/logout routes.

- **Video timestamp:**
  _[To be completed by student]_

- **Relevant files**
  - src/controllers/authController.js
  - src/routes/authRoutes.js
  - src/middleware/authenticateWithJwt.js
  - src/models/User.js


## (API) Additional: Input validation (3 marks)

- **One line description:**
  Used express-validator and custom middleware to validate incoming user/session/comment data with detailed error handling.

- **Video timestamp:**
  _[To be completed by student]_

- **Relevant files**
  - src/validators/validateUser.js
  - src/validators/validateSession.js
  - src/validators/validateComment.js
  - src/middleware/validateJSON.js


## (API) Additional: Query filtering (3 marks)

- **One line description:**
  Enabled search and sort functionality on session listings by title, description, and course code, using flexible query parameters.

- **Video timestamp:**
  _[To be completed by student]_

- **Relevant files**
  - src/controllers/studySessionController.js
  - src/routes/studySessionRoutes.js
  - src/validators/validatePaginateQueryParams.js


## (API) Additional: Pagination (3 marks)

- **One line description:**
  Integrated Mongoose pagination for all list endpoints, including session and comment listings, with standardised query support.

- **Video timestamp:**
  _[To be completed by student]_

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
  _[To be completed by student]_

- **Relevant files**
  - src/middleware/adminAccess.js
  - src/middleware/ownerOrAdmin.js
  - src/middleware/ownerOrModmin.js
  - src/models/User.js

---

## (Client) Core: Application architecture (3 marks)

- **One line description:**
- **Video timestamp:**
- **Relevant files**
  - path/to/file
  - path/to/file

## (Client) Core: User interface design (3 marks)

- **One line description:**
- **Video timestamp:**
- **Relevant files**
  - path/to/file
  - path/to/file

## (Client) Core: React components (3 marks)

- **One line description:**
- **Video timestamp:**
- **Relevant files**
  - path/to/file
  - path/to/file

## (Client) Core: State management (3 marks)

- **One line description:**
- **Video timestamp:**
- **Relevant files**
  - path/to/file
  - path/to/file

## (Client) Core: API integration (3 marks)

- **One line description:**
- **Video timestamp:**
- **Relevant files**
  - path/to/file
  - path/to/file

## (Client) Additional: Authentication (3 marks)

- **One line description:**
- **Video timestamp:**
- **Relevant files**
  - path/to/file
  - path/to/file

## (Client) Additional: Input validation (3 marks)

- **One line description:**
- **Video timestamp:**
- **Relevant files**
  - path/to/file
  - path/to/file

## (Client) Additional: Rate limiting (3 marks)

- **One line description:**
- **Video timestamp:**
- **Relevant files**
  - path/to/file
  - path/to/file

## (Client) Additional: Search and Sort (3 marks)

- **One line description:**
- **Video timestamp:**
- **Relevant files**
  - path/to/file
  - path/to/file

## (Client) Additional: Pagination (3 marks)

- **One line description:**
- **Video timestamp:**
- **Relevant files**
  - path/to/file
  - path/to/file

## (Client) Additional: Accessibility (3 marks)

- **One line description:**
- **Video timestamp:**
- **Relevant files**
  - path/to/file
  - path/to/file

## (Client) Additional: Advanced UI design (3 marks)

- **One line description:**
- **Video timestamp:**
- **Relevant files**
  - path/to/file
  - path/to/file

## (Client) Additional: Responsive design (3 marks)

- **One line description:**
- **Video timestamp:**
- **Relevant files**
  - path/to/file
  - path/to/file

## (Client) Additional: Upon request (3 marks)

- **One line description:**
- **Video timestamp:**
- **Relevant files**
  - path/to/file
  - path/to/file
