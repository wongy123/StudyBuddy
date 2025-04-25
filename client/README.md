# 🎓 StudyBuddy Frontend

This is the frontend of **StudyBuddy**, a platform that helps QUT students find, join, and manage study sessions. Built using **React**, **Vite**, and **Material UI**, it connects to a RESTful Express backend API.

---

## 🎯 Purpose of the Application

StudyBuddy supports collaborative learning by allowing students to:

- Browse or search study sessions by course or topic
- Join and leave sessions
- Create, edit, and delete sessions they own
- Comment and interact with other participants
- View profile pages and session participation history

---

## 🧠 Application Architecture

```
.
├── .env                 # Default environment variables
├── .env.development     # Dev environment (API on localhost)
├── .env.production      # Prod environment (served under /StudyBuddy)
├── index.html           # React mount point
├── package.json         # Project config and scripts
├── README.md            # This file!
├── vite.config.js       # Vite build config
├── public/
│   └── favicon.svg
└── src/
    ├── components/      # Reusable UI elements
    ├── context/         # React context providers
    ├── hooks/           # Custom React hooks
    ├── pages/           # Route-based components (e.g., HomePage, StudySessionPage)
    ├── routes/          # App routing setup
    ├── utils/           # Helpers (e.g., basePath, date formatting)
    └── main.jsx         # App entry point
```

- `BrowserRouter` is set up with a `basename` of `/StudyBuddy` in production.
- API calls are proxied in development using Vite’s `server.proxy`.
- Role-based access control and conditional UI are implemented using token-decoded roles (`user`, `moderator`, `admin`).

---

## 🚀 How to Run the Frontend

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/StudyBuddy.git
cd StudyBuddy/client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Dev Server

Make sure your backend is running at `http://localhost:4000`.

```bash
npm run dev
```

Access the frontend at [http://localhost:5173](http://localhost:5173). It will proxy API requests to the backend.

To expose it to your local network:

```bash
npm run dev -- --host
```

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

---

## ⚙️ Environment Variables

You need the following:

### `.env` (defaults for all environments)

```ini
VITE_API_BASE_URL=http://localhost:4000
VITE_BASE_PATH=
```

### `.env.development`

```ini
VITE_API_BASE_URL=http://localhost:4000
VITE_BASE_PATH=
```

### `.env.production`

```ini
VITE_API_BASE_URL=/StudyBuddy
VITE_BASE_PATH=/StudyBuddy
```

---

## 📦 Dependencies

These are the main libraries used in this project:

### Runtime

- **React** (`^19.0.0`)
- **React DOM** (`^19.0.0`)
- **React Router DOM** (`^7.5.0`) – client-side routing
- **Material UI (MUI)** (`^7.0.1`)
- **MUI Icons** (`^7.0.1`)
- **Emotion** (`^11.14.0`) – styling library used by MUI
- **Date-fns** (`^4.1.0`) – lightweight date utility library
- **jwt-decode** (`^4.0.0`) – decode JWT for role-based access control

### Dev & Tooling

- **Vite** (`^6.2.0`) – lightning-fast build tool
- **@vitejs/plugin-react** – for JSX and fast refresh
- **ESLint** (`^9.21.0`) – linting tool
- **eslint-plugin-react-hooks** – linting for React hooks
- **eslint-plugin-react-refresh** – linting for Vite HMR
- **@eslint/js** – ESLint base config
- **Globals** – share global vars like `window`, `console`
- **TypeScript types**:
  - `@types/react`
  - `@types/react-dom`

You can install all dependencies with:

```
npm install
```

---

## 🧑‍💻 Contributing

We welcome contributions! To contribute:

1. Fork this repo
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Commit and push your changes
4. Open a Pull Request

### Code Style

- Use React functional components + hooks
- Follow consistent formatting (Prettier/VSCode)
- Use MUI components and theme system

---

## 🐞 Reporting Issues

If you encounter bugs or want to suggest features:

1. Check [Issues](https://github.com/YOUR_USERNAME/StudyBuddy/issues)
2. If not already listed, open a new issue with:
   - Description
   - Steps to reproduce
   - Screenshots (if applicable)

---

Made with 💙 by Angus Wong.
