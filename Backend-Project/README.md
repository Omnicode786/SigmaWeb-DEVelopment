# 🎬 Movie Watch List Application - Complete Project Setup Guide

## 📚 Quick Navigation

- **[Backend Documentation](Backend/DOCUMENTATION.md)** - API, database, and server setup
- **[Frontend Documentation](Frontend/Movie-App/DOCUMENTATION.md)** - React app, components, and features

---

## 🎯 Project Overview

This is a **full-stack movie watch list application** that allows users to:
- ✅ Register and login with secure authentication
- ✅ Browse and discover movies
- ✅ Create and manage a personal watch list
- ✅ Rate movies and add notes
- ✅ View analytics dashboard with charts
- ✅ Track watch list statistics

**Tech Stack:**
- **Backend:** Node.js + Express + PostgreSQL (Prisma ORM)
- **Frontend:** React 19 + Vite + Tailwind CSS
- **Authentication:** JWT + bcrypt
- **Charting:** Chart.js
- **Styling:** Tailwind CSS + GSAP animations

---

## 🚀 Project Setup Instructions

### Prerequisites

Before you start, ensure you have:
- **Node.js** v16+ ([Download](https://nodejs.org/))
- **PostgreSQL** v12+ ([Download](https://www.postgresql.org/download/))
- **Git** (for cloning the repository)
- **npm** or **yarn** package manager

### System Requirements
- **RAM:** 2GB minimum
- **Disk Space:** 500MB for dependencies
- **Ports:** 5001 (backend), 5173 (frontend), 5432 (PostgreSQL)

---

## 📖 Complete Setup Guide

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd Backend-Project
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
# Database Configuration
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/movie_watchlist_db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-min-32-chars-long"

# Server Configuration
NODE_ENV="development"
PORT=5001
EOF
```

**⚠️ Important:** Edit the `.env` file with your PostgreSQL credentials:
```bash
# Replace with your PostgreSQL password and credentials
DATABASE_URL="postgresql://username:password@localhost:5432/movie_watchlist_db"
```

### Step 3: PostgreSQL Database Setup

```bash
# Open PostgreSQL command line
psql -U postgres

# Create database (inside psql terminal)
CREATE DATABASE movie_watchlist_db;

# Exit psql
\q

# Or use a single command (macOS/Linux)
createdb movie_watchlist_db
```

### Step 4: Setup Database Schema & Migrations

```bash
# Still in Backend directory

# Generate Prisma client
npm run prisma:generate

# Run migrations to create tables
npm run prisma:migrate

# (Optional) Seed initial data
npm run seed
```

### Step 5: Start Backend Server

```bash
# In Backend directory

# Start development server (with auto-reload)
npm run dev

# Server will start on http://localhost:5001
```

You should see:
```
✓ Database connected successfully
✓ Server is running on port 5001
```

### Step 6: Frontend Setup (New Terminal)

```bash
# Open a new terminal in the project root
cd Frontend/Movie-App

# Install dependencies
npm install

# Start development server
npm run dev
```

Application will open at: `http://localhost:5173`

---

## 📁 Project Directory Structure

```
Backend-Project/
├── Backend/                              # Node.js/Express backend
│   ├── src/
│   │   ├── server.js                    # Express entry point
│   │   ├── config/db.js                 # Database config
│   │   ├── controllers/                 # Business logic
│   │   ├── middleware/                  # Auth & validation
│   │   ├── routes/                      # API endpoints
│   │   ├── utils/                       # Helper functions
│   │   └── validators/                  # Zod schemas
│   ├── prisma/
│   │   ├── schema.prisma                # Database models
│   │   ├── migrations/                  # Database migrations
│   │   └── seed.js                      # Seed data
│   ├── .env                             # Environment variables (create this)
│   ├── package.json
│   ├── DOCUMENTATION.md                 # Backend docs
│   └── README.md
│
├── Frontend/
│   └── Movie-App/                       # React Vite frontend
│       ├── src/
│       │   ├── main.jsx                 # Entry point
│       │   ├── App.jsx                  # Router
│       │   ├── auth/                    # Login/Register
│       │   ├── components/              # Reusable components
│       │   ├── pages/                   # Page components
│       │   ├── data/                    # API utilities
│       │   └── assets/                  # Images/static files
│       ├── index.html
│       ├── vite.config.js
│       ├── package.json
│       ├── DOCUMENTATION.md             # Frontend docs
│       └── eslint.config.js
│
└── README.md                            # This file
```

---

## 🎯 Getting Started (First Time)

After completing all setup steps:

### Terminal 1: Backend
```bash
cd Backend-Project/Backend
npm run dev
# Wait for "Server is running on port 5001"
```

### Terminal 2: Frontend
```bash
cd Backend-Project/Frontend/Movie-App
npm run dev
# Wait for "VITE v... ready in ... ms"
```

### Terminal 3: (Optional - View Database)
```bash
cd Backend-Project/Backend
npm run prisma:studio
# Opens database UI at http://localhost:5555
```

### 4. Open Application
```
http://localhost:5173
```

### 5. Create an Account
- Click **Register**
- Enter Name, Email, Password
- Click **Register**
- Redirected to home page

### 6. Explore Features
- **Movies:** Browse all available movies
- **Add to Watch List:** Click on a movie to add it to your list
- **Dashboard:** View statistics and charts
- **Watch List:** See your added movies with ratings

---

## 🔑 Key Features

### Authentication System
- Secure registration with bcrypt password hashing
- JWT-based login (7-day expiration)
- Protected routes with auto-redirect to login
- Logout functionality

### Movie Management
- View all movies in the database
- Search movies by title, overview, or creator
- Filter by genre
- Add movies to personal watch list

### Watch List Features
- Add movies with status tracking (PLANNED, WATCHING, COMPLETED, DROPPED)
- Rate movies (1-10 scale)
- Add personal notes
- Update or remove items
- View all watch list items

### Analytics Dashboard
- 📊 **Statistics:** Total movies, watch list items, completed count, average rating
- 📈 **Line Chart:** 7-day activity tracking
- 📊 **Bar Chart:** Watch status distribution
- 🥧 **Pie Chart:** Top 5 genres
- 📝 **Recent Items:** Latest 5 added movies

---

## 📊 API Endpoints Summary

### Authentication Routes
```
POST   /auth/register          # Register new user
POST   /auth/login             # User login
POST   /auth/logout            # User logout
```

### Movie Routes
```
GET    /movies/                # Get all movies
```

### Watch List Routes (Authenticated)
```
GET    /watchlist/             # Get user's watch list
POST   /watchlist/             # Add to watch list
PUT    /watchlist/:id          # Update watch list item
DELETE /watchlist/:id          # Remove from watch list
```

---

## 🗄️ Database Schema

### Users
- `id` (UUID, Primary Key)
- `name` (String)
- `email` (String, Unique)
- `password` (Hashed String)
- `createdAt` (DateTime)

### Movies
- `id` (UUID, Primary Key)
- `title` (String)
- `overview` (Text)
- `releaseYear` (Integer)
- `genres` (String Array)
- `runtime` (Integer, Optional)
- `posterUrl` (String, Optional)
- `createdBy` (UUID, Foreign Key)
- `createdAt` (DateTime)

### Watch List Items
- `id` (UUID, Primary Key)
- `title` (String)
- `userId` (UUID, Foreign Key)
- `movieId` (UUID, Foreign Key)
- `status` (Enum: PLANNED, WATCHING, COMPLETED, DROPPED)
- `rating` (Integer 1-10, Optional)
- `notes` (Text, Optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)
- **Unique Constraint:** userId + movieId (prevent duplicates)

---

## 🔒 Security Features

✅ **Password Security**
- bcryptjs with 10 salt rounds
- Never stored in plain text

✅ **JWT Authentication**
- 7-day expiration
- Secure token generation
- Authorization header validation

✅ **Cookie Security**
- HTTP-only cookies (XSS prevention)
- Secure flag (HTTPS only in production)
- SameSite=Strict (CSRF protection)

✅ **Input Validation**
- Zod schema validation
- SQL injection prevention (Prisma ORM)
- XSS attack prevention

✅ **Authorization**
- User data isolation
- Users can only modify their own items
- Protected routes with token verification

---

## 🧪 Testing the Application

### 1. Test Registration
```bash
curl -X POST http://localhost:5001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

### 2. Test Login
```bash
curl -X POST http://localhost:5001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

### 3. Test Protected Routes
```bash
# Use token from login response
curl -X GET http://localhost:5001/watchlist \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🐛 Troubleshooting

### Issue: Database Connection Failed

**Error:** `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solutions:**
1. Verify PostgreSQL is running:
   ```bash
   # macOS
   brew services list
   
   # Windows (Services app)
   # Check if PostgreSQL service is running
   
   # Linux
   sudo systemctl status postgresql
   ```

2. Check DATABASE_URL in `.env`
3. Verify PostgreSQL password in connection string
4. Ensure database exists: `createdb movie_watchlist_db`

---

### Issue: Port 5001 Already in Use

**Error:** `listen EADDRINUSE: address already in use :::5001`

**Solution:**
```bash
# Kill process using port 5001
# macOS/Linux
lsof -ti :5001 | xargs kill -9

# Windows
netstat -ano | findstr :5001
taskkill /PID <PID> /F
```

---

### Issue: Token Invalid or Expired

**Error:** `Invalid token` or `Token expired`

**Solutions:**
1. Clear localStorage and login again: `localStorage.clear()`
2. Ensure `JWT_SECRET` in backend `.env` matches
3. Check token format (should have 3 dots)
4. Token expires after 7 days

---

### Issue: CORS Errors

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Verify backend is running on `http://localhost:5001`
- Check CORS configuration in `Backend/src/server.js`
- Frontend should request from `http://localhost:5001`

---

### Issue: Migrations Failed

**Error:** `Migration not found` or `Database schema drift detected`

**Solutions:**
```bash
# Option 1: Reset database (warning: clears all data)
npm run prisma:reset

# Option 2: Check migration status
npm run prisma:migrate:status

# Option 3: Create new migration
npm run prisma:migrate
```

---

## 📦 Available npm Scripts

### Backend Scripts
```json
{
  "dev": "nodemon src/server.js",
  "start": "node src/server.js",
  "prisma:generate": "prisma generate",
  "prisma:migrate": "prisma migrate dev",
  "prisma:reset": "prisma migrate reset",
  "seed": "node prisma/seed.js",
  "prisma:studio": "prisma studio"
}
```

### Frontend Scripts
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint src"
}
```

---

## 🚀 Production Deployment

### Backend Deployment

1. **Environment Variables (.env)**
```env
DATABASE_URL="postgresql://prod_user:prod_password@prod_db.com/movie_db"
JWT_SECRET="very-long-random-secret-string"
NODE_ENV="production"
PORT=5001
```

2. **Build for Production**
```bash
npm install --production
npm run prisma:migrate  # Run migrations on production DB
```

3. **Deploy to Hosting** (Heroku, Railway, Render, etc.)
```bash
git push heroku main
```

### Frontend Deployment

1. **Build Production Bundle**
```bash
npm run build
```

2. **Deploy to Hosting** (Vercel, Netlify, GitHub Pages)
```bash
# Vercel
vercel

# Netlify
npm run build && netlify deploy --prod --dir=dist
```

3. **Update API URL** in environment:
```env
VITE_API_URL=https://api.your-domain.com
```

---

## 🎓 Learning Resources

### Backend Stack
- **Express.js:** https://expressjs.com/
- **Prisma ORM:** https://www.prisma.io/
- **PostgreSQL:** https://www.postgresql.org/docs/
- **JWT:** https://jwt.io/
- **Zod Validation:** https://zod.dev/

### Frontend Stack
- **React:** https://react.dev/
- **React Router:** https://reactrouter.com/
- **Vite:** https://vitejs.dev/
- **Tailwind CSS:** https://tailwindcss.com/
- **Axios:** https://axios-http.com/

### Tools & Services
- **Prisma Studio:** Database GUI (included)
- **Postman:** API testing https://www.postman.com/
- **VSCode:** Editor https://code.visualstudio.com/

---

## 📞 Getting Help

If you encounter issues:

1. **Check Documentation:**
   - [Backend Docs](Backend/DOCUMENTATION.md)
   - [Frontend Docs](Frontend/Movie-App/DOCUMENTATION.md)

2. **Check Logs:**
   ```bash
   # Backend logs (terminal running npm run dev)
   # Frontend logs (browser console)
   # Database: Prisma Studio (npm run prisma:studio)
   ```

3. **Verify Setup:**
   - Backend running: `curl http://localhost:5001/movies/hello`
   - Frontend running: `http://localhost:5173`
   - Database connected: Check backend terminal for "Database connected"

---

## 📝 Common Development Tasks

### Add a New Movie to Database
```bash
# Use Prisma Studio
npm run prisma:studio
# Click "+ Add record" in Movie table
```

### Reset Database (Warning: Deletes All Data)
```bash
cd Backend
npm run prisma:reset
```

### View Database in Terminal
```bash
# Using Prisma Studio (Recommended)
cd Backend
npm run prisma:studio

# Or query directly with psql
psql -U postgres -d movie_watchlist_db
```

### Modify Database Schema
```bash
# Edit Backend/prisma/schema.prisma
# Then run:
npm run prisma:migrate
```

### Debug API Requests
```bash
# 1. Backend: Check Express logs
# 2. Frontend: Browser DevTools Network tab
# 3. Use Postman to test endpoints directly
```

---

## 🔄 Development Workflow

```
1. Make changes to code
2. Backend auto-reloads (nodemon)
3. Frontend auto-reloads (Vite HMR)
4. Test in browser
5. Check browser console for errors
6. Check backend terminal for API errors
7. Use Prisma Studio to verify database changes
```

---

## 📋 Project Checklist

- [ ] Node.js v16+ installed
- [ ] PostgreSQL installed and running
- [ ] Repository cloned
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] `.env` file created in Backend folder
- [ ] Database created (`movie_watchlist_db`)
- [ ] Migrations run (`npm run prisma:migrate`)
- [ ] Backend running on port 5001
- [ ] Frontend running on port 5173
- [ ] Can access http://localhost:5173
- [ ] Can register a new account
- [ ] Can see movies in frontend
- [ ] Can add items to watch list

---

## 🎉 Congratulations!

You've successfully set up the Movie Watch List Application! 

**Next Steps:**
1. Explore the application features
2. Create a few movies and watch list items
3. Check out the analytics dashboard
4. Read the [Backend Docs](Backend/DOCUMENTATION.md) for API details
5. Read the [Frontend Docs](Frontend/Movie-App/DOCUMENTATION.md) for component details

---

## 📄 Documentation Files

| Document | Location | Content |
|----------|----------|---------|
| **Backend Docs** | [Backend/DOCUMENTATION.md](Backend/DOCUMENTATION.md) | API, database, server setup |
| **Frontend Docs** | [Frontend/Movie-App/DOCUMENTATION.md](Frontend/Movie-App/DOCUMENTATION.md) | React, components, features |
| **This File** | [README.md](README.md) | Project overview and setup |

---

**Project Version:** 1.0.0  
**Last Updated:** April 21, 2026  
**Status:** ✅ Ready for Development & Deployment

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the detailed documentation files
3. Check backend terminal for error messages
4. Check browser console for frontend errors
5. Verify all prerequisites are installed

**Happy coding! 🎬**
