# Backend Documentation - Movie Watch List API

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Setup Instructions](#setup-instructions)
3. [Project Structure](#project-structure)
4. [File Documentation](#file-documentation)
5. [Helper Functions](#helper-functions)
6. [API Endpoints](#api-endpoints)
7. [Database Schema](#database-schema)
8. [Middleware](#middleware)

---

## 🎯 Project Overview

This is a **Node.js/Express** backend for a movie watch list application. It provides RESTful APIs for:
- User authentication (Registration, Login, Logout)
- Movie management (Browse movies)
- Watch list management (CRUD operations)
- JWT-based authorization with secure password hashing

**Stack:**
- Framework: Express.js
- Database: PostgreSQL with Prisma ORM
- Authentication: JWT tokens + bcrypt password hashing
- Validation: Zod schema validation
- Runtime: Node.js

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Backend-Project/Backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the Backend root directory:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/movie_watchlist_db"

# JWT Secret (use a strong random string)
JWT_SECRET="your-super-secret-jwt-key-here"

# Node Environment
NODE_ENV="development"

# Server Port
PORT=5001
```

### 4. Setup PostgreSQL Database
```bash
# Create database
createdb movie_watchlist_db

# Or connect to existing PostgreSQL instance and run:
psql -U postgres -c "CREATE DATABASE movie_watchlist_db;"
```

### 5. Run Prisma Migrations
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations to create tables
npm run prisma:migrate

# (Optional) Seed initial data
npm run seed
```

### 6. Start the Server
```bash
# Development mode (with auto-reload via nodemon)
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5001`

---

## 📁 Project Structure

```
Backend/
├── src/
│   ├── server.js                 # Express app entry point
│   ├── config/
│   │   └── db.js                 # Database connection & configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── movieController.js    # Movie retrieval
│   │   └── watchListController.js # Watch list CRUD
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── validateRequest.js    # Zod schema validation
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── movieRoutes.js        # Movie endpoints
│   │   └── watchListRoutes.js    # Watch list endpoints
│   ├── utils/
│   │   └── generateToken.js      # JWT token generation
│   └── validators/
│       └── watchListValidators.js # Zod schemas
├── prisma/
│   ├── schema.prisma             # Database models
│   ├── seed.js                   # Database seeding
│   └── migrations/               # Prisma migrations
├── package.json
├── prisma.config.ts
└── .env                          # Environment variables (create this)
```

---

## 📄 File Documentation

### Core Files

#### **src/server.js**
**Purpose:** Express application entry point and error handling

**Key Functions:**
- Initializes Express middleware (JSON, CORS, URL encoding)
- Connects database on startup
- Routes all API endpoints
- Global error handler for unhandled rejections and exceptions
- Graceful shutdown on SIGTERM signal

**Key Imports:**
- `express`: Web framework
- `cors`: Cross-origin resource sharing
- `authRoutes`, `movieRoutes`, `watchListRoutes`: API routes
- `connectDB`, `disconnectDB`: Database management
- `prisma`: Database client

**Environment Variables Used:**
- `PORT`: Server port (default: 5001)

**Error Handling:**
- Unhandled Promise Rejections
- Uncaught Exceptions
- Process termination with SIGTERM signal

---

#### **src/config/db.js**
**Purpose:** PostgreSQL database connection and management

**Exported Functions:**

| Function | Purpose |
|----------|---------|
| `connectDB()` | Connects to PostgreSQL via Prisma, logs query in development |
| `disconnectDB()` | Safely disconnects from database |

**Key Imports:**
- `@prisma/client`: Prisma ORM client
- `@prisma/adapter-pg`: PostgreSQL adapter

**Configuration:**
- Uses `DATABASE_URL` from environment
- Query logging enabled in development mode
- Enables automatic JSON serialization

**Exports:**
- `prisma`: Singleton Prisma client instance
- `connectDB`, `disconnectDB`: Connection functions

---

### Controllers

#### **src/controllers/authController.js**
**Purpose:** Handle user registration, login, and logout

**Exported Functions:**

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `register` | `req, res` | User object + JWT | Creates new user, hashes password, generates token |
| `login` | `req, res` | User object + JWT | Authenticates user, generates token |
| `logout` | `req, res` | Success message | Clears JWT cookie |

**Helper Logic:**
- Password hashing using bcryptjs (10 salt rounds)
- Email uniqueness validation
- JWT token generation via `generateToken()` utility
- Error handling for duplicate emails and invalid credentials

**Key Imports:**
- `bcryptjs`: Password hashing
- `prisma`: Database operations
- `generateToken`: JWT token creation

**Request/Response Examples:**

Register:
```json
// Request
POST /auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123"
}

// Response (201)
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com"
}
```

Login:
```json
// Request
POST /auth/login
{
  "email": "john@example.com",
  "password": "securepass123"
}

// Response (200)
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

#### **src/controllers/movieController.js**
**Purpose:** Handle movie data retrieval

**Exported Functions:**

| Function | Purpose |
|----------|---------|
| `showAllMovie(req, res)` | Fetches all movies from database |

**Key Imports:**
- `prisma`: Database queries

**Response Example:**
```json
[
  {
    "id": "uuid",
    "title": "Inception",
    "overview": "A skilled thief who steals corporate secrets...",
    "releaseYear": 2010,
    "genres": ["Sci-Fi", "Thriller"],
    "runtime": 148,
    "posterUrl": "https://...",
    "createdBy": "uuid"
  }
]
```

---

#### **src/controllers/watchListController.js**
**Purpose:** Handle watch list CRUD operations

**Exported Functions:**

| Function | Purpose |
|----------|---------|
| `addtoWatchList(req, res)` | Add movie to user's watch list |
| `removeFromWatchList(req, res)` | Delete watch list item |
| `updateIntoWatchList(req, res)` | Update status, rating, or notes |
| `showAllWatchList(req, res)` | Get all items for authenticated user |

**Key Features:**
- Duplicate prevention via unique constraint `userId_movieId`
- User authorization (users can only modify their own items)
- Status values: `PLANNED`, `WATCHING`, `COMPLETED`, `DROPPED`
- Rating: 1-10 scale (optional)

**Key Imports:**
- `prisma`: Database operations
- `req.user`: User object from AuthMiddleware

**Request/Response Examples:**

Add to Watch List:
```json
// Request
POST /watchlist
Authorization: Bearer <token>
{
  "movieId": "uuid",
  "status": "WATCHING",
  "rating": 8,
  "notes": "Great movie!"
}

// Response (201)
{
  "id": "uuid",
  "title": "Movie Title",
  "userId": "uuid",
  "movieId": "uuid",
  "status": "WATCHING",
  "rating": 8,
  "notes": "Great movie!",
  "createdAt": "2026-04-21T...",
  "updatedAt": "2026-04-21T..."
}
```

Update Watch List Item:
```json
// Request
PUT /watchlist/:id
Authorization: Bearer <token>
{
  "status": "COMPLETED",
  "rating": 9
}

// Response (200)
{
  "id": "uuid",
  "status": "COMPLETED",
  "rating": 9,
  "updatedAt": "2026-04-21T..."
}
```

Get All Watch List:
```json
// Request
GET /watchlist
Authorization: Bearer <token>

// Response (200)
[
  {
    "id": "uuid",
    "title": "Movie Title",
    "userId": "uuid",
    "movieId": "uuid",
    "status": "WATCHING",
    "rating": 8,
    "notes": "Notes...",
    "createdAt": "2026-04-21T...",
    "updatedAt": "2026-04-21T..."
  }
]
```

---

### Middleware

#### **src/middleware/authMiddleware.js**
**Purpose:** JWT authentication and user verification

**Exported Function:**
```javascript
AuthMiddleware(req, res, next)
```

**Token Sources (in priority order):**
1. `Authorization` header: `Authorization: Bearer <token>`
2. JWT cookie (if set by `generateToken()`)

**Functionality:**
- Extracts JWT from request
- Verifies token validity using `jsonwebtoken`
- Fetches user from database
- Populates `req.user` with user object
- Calls `next()` on success or sends 401 on failure

**Error Responses:**
```json
// No token
{ "message": "No token, authorization denied" }

// Invalid token
{ "message": "Invalid token" }

// Token expired
{ "message": "Token expired" }
```

**Key Imports:**
- `jsonwebtoken`: Token verification
- `prisma`: User database lookup

---

#### **src/middleware/validateRequest.js**
**Purpose:** Request body validation using Zod schemas

**Exported Function:**
```javascript
validateRequest(schema)
```

**Returns:** Middleware function that validates request body

**Functionality:**
- Validates `req.body` against provided Zod schema
- Flattens Zod errors for API response
- Returns 400 Bad Request on validation failure
- Calls `next()` on success

**Error Response:**
```json
{
  "message": "Validation Error",
  "errors": {
    "movieId": "Required",
    "status": "Invalid enum value"
  }
}
```

**Usage Example:**
```javascript
router.post(
  '/watchlist',
  validateRequest(addToWatchListSchema),
  addtoWatchList
);
```

---

### Routes

#### **src/routes/authRoutes.js**
**Endpoints:**

| Method | Path | Controller | Description |
|--------|------|-----------|-------------|
| POST | `/auth/register` | `register` | User registration |
| POST | `/auth/login` | `login` | User login |
| POST | `/auth/logout` | `logout` | User logout |

---

#### **src/routes/movieRoutes.js**
**Endpoints:**

| Method | Path | Controller | Description |
|--------|------|-----------|-------------|
| GET | `/movies/` | `showAllMovie` | Get all movies |
| GET | `/movies/hello` | - | Health check endpoint |

---

#### **src/routes/watchListRoutes.js**
**Middleware Applied:**
- `AuthMiddleware` (all routes require authentication)
- `validateRequest(addToWatchListSchema)` (POST requests only)

**Endpoints:**

| Method | Path | Controller | Description |
|--------|------|-----------|-------------|
| GET | `/watchlist/` | `showAllWatchList` | Get user's watch list |
| POST | `/watchlist/` | `addtoWatchList` | Add to watch list |
| DELETE | `/watchlist/:id` | `removeFromWatchList` | Remove from watch list |
| PUT | `/watchlist/:id` | `updateIntoWatchList` | Update watch list item |

---

### Utilities

#### **src/utils/generateToken.js**
**Purpose:** JWT token generation and secure cookie management

**Exported Function:**
```javascript
generateToken(userId, res)
```

**Parameters:**
- `userId`: User UUID
- `res`: Express response object

**Returns:** JWT token string

**Token Configuration:**
- Algorithm: HS256
- Expiration: 7 days
- Payload: `{ userId }`
- Secret: `process.env.JWT_SECRET`

**Cookie Settings:**
- `httpOnly: true` - XSS attack prevention
- `secure: true` (production only) - HTTPS only
- `sameSite: "strict"` - CSRF attack prevention
- `maxAge: 604800000` ms (7 days)
- Cookie name: `jwt`

**Usage:**
```javascript
const token = generateToken(user.id, res);
res.status(200).json({ message: "Login successful", user });
```

---

### Validators

#### **src/validators/watchListValidators.js**
**Purpose:** Zod schemas for input validation

**Exported Schema: `addToWatchListSchema`**

Validates watch list form input:

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `movieId` | String (UUID) | ✓ | Must be valid UUID |
| `status` | Enum | ✗ | `PLANNED` \| `WATCHING` \| `COMPLETED` \| `DROPPED` |
| `rating` | Integer | ✗ | 1-10 |
| `notes` | String | ✗ | Text notes |

**Usage:**
```javascript
import { addToWatchListSchema } from './validators/watchListValidators.js';

router.post(
  '/watchlist',
  validateRequest(addToWatchListSchema),
  addtoWatchList
);
```

---

## 🔧 Helper Functions Summary

### Authentication Helpers

| File | Function | Purpose |
|------|----------|---------|
| `authController.js` | `register()` | User registration with password hashing |
| `authController.js` | `login()` | User login with credentials validation |
| `authController.js` | `logout()` | Clears JWT cookie |
| `generateToken.js` | `generateToken(userId, res)` | Creates JWT with secure cookie |

### Database Helpers

| File | Function | Purpose |
|------|----------|---------|
| `db.js` | `connectDB()` | PostgreSQL connection setup |
| `db.js` | `disconnectDB()` | Safe database disconnect |

### Middleware Helpers

| File | Function | Purpose |
|------|----------|---------|
| `authMiddleware.js` | `AuthMiddleware(req, res, next)` | JWT verification & user extraction |
| `validateRequest.js` | `validateRequest(schema)` | Zod schema validation |

### Watch List Helpers

| File | Function | Purpose |
|------|----------|---------|
| `watchListController.js` | `addtoWatchList()` | Add movie with duplicate check |
| `watchListController.js` | `removeFromWatchList()` | Delete watch list item |
| `watchListController.js` | `updateIntoWatchList()` | Update item metadata |
| `watchListController.js` | `showAllWatchList()` | Fetch user's items |

---

## 📊 Database Schema

### User Model
```prisma
model User {
  id                String          @id @default(uuid())
  name              String
  email             String          @unique
  password          String
  createdAt         DateTime        @default(now())
  watchListItems    WatchListItem[]
  movies            Movie[]         @relation("Creator")
}
```

### Movie Model
```prisma
model Movie {
  id                String          @id @default(uuid())
  title             String
  overview          String
  releaseYear       Int
  genres            String[]
  runtime           Int?
  posterUrl         String?
  createdBy         String
  creator           User            @relation("Creator", fields: [createdBy], references: [id])
  createdAt         DateTime        @default(now())
  watchListItems    WatchListItem[]
}
```

### WatchListItem Model
```prisma
model WatchListItem {
  id                String          @id @default(uuid())
  title             String
  userId            String
  movieId           String
  user              User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  movie             Movie           @relation(fields: [movieId], references: [id], onDelete: Cascade)
  status            WatchListStatus @default(PLANNED)
  rating            Int?
  notes             String?
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt

  @@unique([userId, movieId])  // Prevent duplicate entries
}
```

### WatchListStatus Enum
```prisma
enum WatchListStatus {
  PLANNED
  WATCHING
  COMPLETED
  DROPPED
}
```

---

## 🔐 Security Features

1. **Password Hashing:** bcryptjs with 10 salt rounds
2. **JWT Authentication:** Secure token-based auth
3. **CORS:** Configured for frontend domain
4. **HTTP-Only Cookies:** XSS attack prevention
5. **Secure Cookies:** HTTPS-only in production
6. **CSRF Protection:** SameSite=Strict
7. **Input Validation:** Zod schema validation
8. **Authorization:** User data isolation
9. **Unique Constraints:** Prevent duplicate watch list entries
10. **Error Handling:** Generic error messages for security

---

## 🧪 Testing API Endpoints

Use curl or Postman to test:

```bash
# Register
curl -X POST http://localhost:5001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"pass123"}'

# Get Movies
curl -X GET http://localhost:5001/movies \
  -H "Authorization: Bearer YOUR_TOKEN"

# Add to Watch List
curl -X POST http://localhost:5001/watchlist \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"movieId":"uuid","status":"WATCHING","rating":8}'

# Get Watch List
curl -X GET http://localhost:5001/watchlist \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Database connection failed | Check `DATABASE_URL` in `.env` and PostgreSQL is running |
| JWT token invalid | Ensure `JWT_SECRET` matches in `.env` |
| CORS errors | Frontend URL may need to be added to CORS config in `server.js` |
| Migrations not running | Run `npm run prisma:migrate` to apply pending migrations |
| Port 5001 already in use | Change `PORT` in `.env` or kill process using the port |

---

## 📦 Available npm Scripts

```json
{
  "dev": "nodemon src/server.js",
  "start": "node src/server.js",
  "prisma:generate": "prisma generate",
  "prisma:migrate": "prisma migrate dev",
  "prisma:reset": "prisma migrate reset",
  "seed": "node prisma/seed.js"
}
```

---

## 🔗 Related Documentation

- **Frontend Docs:** See [Frontend/Movie-App/DOCUMENTATION.md](../Frontend/Movie-App/DOCUMENTATION.md)
- **Prisma Docs:** https://www.prisma.io/docs/
- **Express Docs:** https://expressjs.com/
- **JWT Docs:** https://jwt.io/
