# Campus Event System

A web application for managing campus events and student registrations.

## Features

- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Event creation, viewing, updating, and deletion
- SQLite database

## Technology Stack

- Node.js
- Express.js
- SQLite
- bcryptjs
- JSON Web Token (JWT)

## Project Structure

```text
campus-event-system/
├── src/
│   ├── database/
│   │   ├── check-db.js
│   │   └── db.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── events.js
│   │   └── registrations.js
│   └── server.js
├── .gitignore
├── package.json
└── package-lock.json
```

## Setup Instructions

1. Install Node.js and npm.
2. Clone the repository.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and configure the required environment variables, including `JWT_SECRET`.
5. Start the server using the appropriate script from `package.json`.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check server health |
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Log in a user |
| GET/POST/PUT/DELETE | `/api/events` | Event management; see route definitions for supported paths |

## Security

- Never commit `.env` files, passwords, tokens, or database files.
- Use a strong, private JWT secret.
- Store passwords as hashes, not plain text.

## Team Workflow

- `main` is the stable branch.
- Develop new features on dedicated feature branches.
- Submit pull requests for review before merging into `main`.
- Test changes before approving pull requests.

## Team Members

Add the names and responsibilities of all five team members here.

## Project Status

Backend API development is in progress. Frontend integration, testing, and deployment remain to be completed.