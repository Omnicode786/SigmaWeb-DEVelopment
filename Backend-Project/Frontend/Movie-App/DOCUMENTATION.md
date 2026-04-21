# Frontend Documentation - Movie Watch List App

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Setup Instructions](#setup-instructions)
3. [Project Structure](#project-structure)
4. [File Documentation](#file-documentation)
5. [Helper Functions](#helper-functions)
6. [Component Architecture](#component-architecture)
7. [State Management](#state-management)
8. [API Integration](#api-integration)

---

## 🎯 Project Overview

This is a **React** frontend for a movie watch list application. Features include:
- User authentication (Login & Registration)
- Movie discovery and browsing
- Watch list management
- Analytics dashboard with charts
- Responsive UI with Tailwind CSS
- Smooth animations with GSAP

**Stack:**
- Framework: React 19 with Vite
- Routing: React Router v7
- HTTP Client: Axios
- Styling: Tailwind CSS
- Charts: Chart.js + react-chartjs-2
- Animations: GSAP
- Icons: lucide-react

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Backend API running on `http://localhost:5001`

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Backend-Project/Frontend/Movie-App
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration (Optional)
Create a `.env` file if you need custom backend URL:
```env
# .env (optional - defaults to localhost:5001)
VITE_API_URL=http://localhost:5001
```

### 4. Start Development Server
```bash
npm run dev
```

Application will open at `http://localhost:5173` (Vite default)

### 5. Build for Production
```bash
npm run build
```

### 6. Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
Frontend/Movie-App/
├── src/
│   ├── main.jsx                     # App entry point
│   ├── App.jsx                      # Routing & layout
│   ├── App.css                      # Global styles
│   ├── index.css                    # Tailwind imports
│   ├── auth/
│   │   ├── Login.jsx                # Login component
│   │   └── Register.jsx             # Registration component
│   ├── components/
│   │   ├── NavBar.jsx               # Navigation component
│   │   ├── ProtectedRoute.jsx       # Auth guard wrapper
│   │   ├── BarChart.jsx             # Bar chart component
│   │   ├── LineChart.jsx            # Line chart component
│   │   └── PieChart.jsx             # Pie chart component
│   ├── pages/
│   │   ├── HomePage.jsx             # Dashboard with analytics
│   │   ├── Movies.jsx               # Movie discovery page
│   │   └── WatchList.jsx            # Watch list display
│   ├── data/
│   │   └── data.js                  # API utilities & data processing
│   └── assets/                      # Images and static files
├── public/                          # Static files
├── index.html                       # HTML entry point
├── vite.config.js                   # Vite configuration
├── eslint.config.js                 # ESLint configuration
├── package.json                     # Dependencies
└── README.md
```

---

## 📄 File Documentation

### Entry Points

#### **main.jsx**
**Purpose:** React application entry point

**Functionality:**
- Imports React and renders App component
- Wraps App in `StrictMode` for development warnings
- Mounts to HTML element with id `root`

**Key Imports:**
- React, ReactDOM
- App component
- Global styles (index.css)

---

#### **App.jsx**
**Purpose:** Main routing and layout component using React Router v7

**Route Structure:**

**Public Routes** (no authentication required):
- `/login` → Login component
- `/register` → Register component

**Protected Routes** (authentication required, with NavBar):
- `/` → Redirect to `/home`
- `/home` → HomePage (Dashboard)
- `/movies` → Movies (Discovery)
- `/watchlist` → WatchList (User list)

**Route Component Structure:**
```jsx
// Public routes
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />

// Protected routes with NavBar
<Route element={<ProtectedRoute><NavBar /></ProtectedRoute>}>
  <Route path="/" element={<HomePage />} />
  <Route path="/home" element={<HomePage />} />
  <Route path="/movies" element={<Movies />} />
  <Route path="/watchlist" element={<WatchList />} />
</Route>
```

**Key Imports:**
- React Router v7
- All page and auth components

---

### Authentication

#### **auth/Login.jsx**
**Purpose:** User login form and authentication

**Component State:**
```javascript
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [user, setUser] = useState(null);
```

**Key Features:**
- Email and password input fields
- Form validation (email format check)
- POST request to `http://localhost:5001/auth/login`
- JWT token storage in localStorage
- Error handling with alert notifications
- Auto-redirect to `/` on successful login
- Link to register page

**Form Data:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response:**
```json
{
  "id": "uuid",
  "name": "User Name",
  "email": "user@example.com"
}
```

**Error Handling:**
- Network errors display as alerts
- Invalid credentials: "Invalid email or password"
- Server errors: Display error message from response

**Navigation:**
- Success: Redirects to `/` (home)
- Link to register: `/register`

---

#### **auth/Register.jsx**
**Purpose:** User registration form

**Component State:**
```javascript
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [user, setUser] = useState(null);
```

**Key Features:**
- Name, email, password input fields
- POST request to `http://localhost:5001/auth/register`
- JWT token auto-stored on success
- Validation and error handling
- Duplicate email detection
- Auto-redirect to `/` on success
- Link to login page

**Form Data:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123"
}
```

**Error Handling:**
- Duplicate email: "User already exists"
- Network errors: Displays alert
- Validation errors: Shows error message

**Navigation:**
- Success: Redirects to `/`
- Link to login: `/login`

---

### Components

#### **components/ProtectedRoute.jsx**
**Purpose:** Route protection wrapper - guards against unauthorized access

**Functionality:**
1. Checks for JWT token in localStorage
2. Validates token format (must contain 3 parts separated by `.`)
3. If valid: renders children components
4. If invalid/missing: redirects to `/login`

**Token Validation:**
```javascript
const token = localStorage.getItem('token');
const isValidToken = token && token.split('.').length === 3;
```

**Usage:**
```jsx
<Route element={<ProtectedRoute><NavBar /></ProtectedRoute>}>
  <Route path="/home" element={<HomePage />} />
</Route>
```

**Security Note:**
- Token structure verification (JWT format)
- Prevents access to protected pages without valid token
- Automatic redirect to login if token missing/invalid

---

#### **components/NavBar.jsx**
**Purpose:** Navigation bar for authenticated users

**Features:**
- Fixed top navigation bar with glassmorphism effect
- Navigation links to: Home, Movies, Watch List
- User logout functionality
- Blur background effect with Tailwind CSS

**Navigation Links:**
- `/home` → HomePage (Dashboard)
- `/movies` → Movies (Discovery)
- `/watchlist` → WatchList (User list)

**Logout Function:**
- Removes JWT token from localStorage
- Redirects to `/login`
- Reloads page to clear app state

**Styling:**
- Fixed positioning: `top-0`, `left-0`, `right-0`
- Glassmorphism: `backdrop-blur-md`
- Responsive: Mobile-friendly navigation

**Key Imports:**
- React Router `useNavigate`, `Link`
- Tailwind CSS classes

---

#### **components/BarChart.jsx**
**Purpose:** Reusable bar chart component using Chart.js

**Props:**

| Prop | Type | Required | Default | Purpose |
|------|------|----------|---------|---------|
| `chartData` | Object | ✓ | - | Chart.js data object |
| `title` | String | ✗ | "Watchlist Status" | Chart title |
| `options` | Object | ✗ | Default config | Chart.js options |

**Base Configuration:**
```javascript
{
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { position: 'top' }
  },
  scales: {
    y: { min: 0, ticks: { stepSize: 1 } }
  }
}
```

**Data Structure Example:**
```javascript
const chartData = {
  labels: ['PLANNED', 'WATCHING', 'COMPLETED', 'DROPPED'],
  datasets: [{
    label: 'Count',
    data: [5, 3, 8, 2],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
  }]
};
```

**Usage:**
```jsx
<BarChart 
  chartData={statusData}
  title="Watch Status Distribution"
/>
```

---

#### **components/LineChart.jsx**
**Purpose:** Reusable line chart component for time-series data

**Props:**

| Prop | Type | Required | Default | Purpose |
|------|------|----------|---------|---------|
| `chartData` | Object | ✓ | - | Chart.js data object |
| `title` | String | ✗ | "Activity" | Chart title |
| `options` | Object | ✗ | Default config | Chart.js options |

**Base Configuration:**
- Responsive with fixed container height
- Legend at top
- Integer precision on Y-axis
- Smooth curved lines (tension: 0.1)

**Usage Example:**
```jsx
<LineChart 
  chartData={weeklyData}
  title="7-Day Activity"
/>
```

---

#### **components/PieChart.jsx**
**Purpose:** Reusable pie chart component for distribution data

**Props:**

| Prop | Type | Required | Default | Purpose |
|------|------|----------|---------|---------|
| `chartData` | Object | ✓ | - | Chart.js data object |
| `title` | String | ✗ | "Distribution" | Chart title |
| `options` | Object | ✗ | Default config | Chart.js options |

**Usage Example:**
```jsx
<PieChart 
  chartData={genreData}
  title="Top Genres"
/>
```

---

### Pages

#### **pages/HomePage.jsx**
**Purpose:** Analytics dashboard with statistics and charts

**Components Used:**
- `useDashboardData()` hook for data management
- BarChart, LineChart, PieChart components
- StatCard component (inline)
- lucide-react icons
- GSAP animations

**Layout:**
```
┌─────────────────────────────────────────┐
│  Header: Dashboard                      │
├────────┬────────┬────────┬────────────┤
│ Total  │Watchlist│Completed│ Average    │
│ Movies │ Items   │ Movies  │ Rating     │
├─────────────────────────────────────────┤
│  Line Chart (7-Day Activity)            │
├─────────────────────────────────────────┤
│ Bar Chart (Status)    │ Pie Chart      │
│                       │ (Genres)       │
├─────────────────────────────────────────┤
│  Recent Watch List Items                │
├─────────────────────────────────────────┤
│  [Refresh Button]                       │
└─────────────────────────────────────────┘
```

**Stat Cards Display:**
- Total Movies (count)
- Total Watch List Items (count)
- Completed Movies (count)
- Average Rating (decimal)

**Charts Displayed:**
1. **Line Chart:** Watch list items added per day (last 7 days)
2. **Bar Chart:** Distribution by status (PLANNED, WATCHING, COMPLETED, DROPPED)
3. **Pie Chart:** Top 5 genres in watch list

**Recent Items Section:**
- Shows 5 most recently added watch list items
- Displays title, status, rating
- Updates when data refreshes

**Refresh Button:**
- Calls `refetch()` from `useDashboardData()` hook
- Reloads all data from server

**Loading/Error States:**
- Loading spinner while fetching data
- Error message display if fetch fails

**Animations:**
- GSAP animations on component mount
- Fade-in effects for content

---

#### **pages/Movies.jsx**
**Purpose:** Movie discovery and watch list management

**Component State:**
```javascript
const [movies, setMovies] = useState([]);
const [selectedMovie, setSelectedMovie] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [status, setStatus] = useState('PLANNED');
const [rating, setRating] = useState('');
const [notes, setNotes] = useState('');
const [loadingMovies, setLoadingMovies] = useState(true);
const [submitting, setSubmitting] = useState(false);
const [addedMovieIds, setAddedMovieIds] = useState(new Set());
const [searchQuery, setSearchQuery] = useState('');
const [activeGenre, setActiveGenre] = useState('All');
const [toast, setToast] = useState({ message: '', type: '' });
```

**Key Features:**

1. **Movie Fetching:**
   - Loads all movies on component mount
   - Displays in responsive grid
   - Shows loading spinner

2. **Search Functionality:**
   - Search by title, overview, or creator name
   - Real-time filtering with `useMemo()`
   - Case-insensitive matching

3. **Genre Filtering:**
   - Dynamic genre buttons extracted from movies
   - "All" button to show all movies
   - Only shows genres that exist in watch list

4. **Modal Form:**
   - Add to watch list modal
   - Fields: Status (dropdown), Rating (1-10), Notes (textarea)
   - Submit button + Cancel button

5. **Toast Notifications:**
   - Success: "Added to watch list!"
   - Error: Displays error message
   - Auto-dismiss after 3 seconds

6. **State Tracking:**
   - `addedMovieIds` Set prevents duplicate "added" states
   - Button shows "Added ✓" for already-added movies
   - Prevents re-adding same movie

7. **Animations:**
   - GSAP animations on page load
   - Smooth transitions

**Movie Card Display:**
- Movie poster image (if available)
- Title
- Overview (truncated)
- Release year
- Genres
- "Add to Watch List" button (or "Added ✓")

**Modal Form Fields:**

| Field | Type | Default | Options |
|-------|------|---------|---------|
| `status` | Select | `PLANNED` | PLANNED, WATCHING, COMPLETED, DROPPED |
| `rating` | Number | `''` | 1-10 |
| `notes` | Text | `''` | Any text |

**Form Submission:**
1. Validates form inputs
2. Makes POST request to `/watchlist`
3. Shows loading state
4. On success: Shows toast, closes modal, adds movieId to `addedMovieIds`
5. On error: Shows error toast

**Helper Function: `showToast(message, type)`**
```javascript
// type: 'success' or 'error'
// Auto-dismisses after 3 seconds
```

---

#### **pages/WatchList.jsx**
**Purpose:** Display user's watch list with metadata and ratings

**Component State:**
```javascript
const [watchlist, setWatchlist] = useState([]);
const [loading, setLoading] = useState(true);
```

**Key Features:**

1. **Data Fetching:**
   - Loads watch list on component mount
   - Uses Bearer token from localStorage
   - Includes loading state

2. **Item Display:**
   - Responsive grid layout
   - Card for each watch list item

3. **Card Information:**
   - Movie title
   - Status badge (with color coding)
   - Star rating visualization (1-10 stars)
   - Notes (if any)
   - Date added (formatted)
   - Item type indicator

4. **Status Badge Colors:**
   - PLANNED: Blue
   - WATCHING: Orange
   - COMPLETED: Green
   - DROPPED: Red/Gray

5. **Rating Visualization:**
   - Star icons (★ filled, ☆ empty)
   - Shows rating out of 10

**Card Layout Example:**
```
┌──────────────────────────┐
│ Movie Title              │
├──────────────────────────┤
│ Status: WATCHING         │
│ Rating: ★★★★★☆☆☆☆☆    │
│ Notes: Great movie!      │
│ Added: 2 days ago        │
└──────────────────────────┘
```

**Error Handling:**
- Shows error message if fetch fails
- Loading spinner during fetch

---

### Data & API

#### **data/data.js**
**Purpose:** Centralized API utilities and data processing

**Axios Configuration:**
```javascript
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001'
});

// Auto-inject Bearer token in all requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**API Functions:**

| Function | Method | Endpoint | Returns |
|----------|--------|----------|---------|
| `fetchMovies()` | GET | `/movies` | Array of movies |
| `fetchWatchlist()` | GET | `/watchlist` | Array of watch list items |

**useDashboardData Hook:**

**Returns Object:**
```javascript
{
  loading: boolean,              // Data loading state
  error: string,                 // Error message (if any)
  movies: [],                    // All movies array
  watchlist: [],                 // User's watch list
  stats: {
    totalMovies: number,         // Total movies count
    totalWatchlist: number,      // Total watch list items
    completedMovies: number,     // Completed items count
    averageRating: number        // Average rating (decimal)
  },
  barChartData: object,          // Chart.js bar chart data
  lineChartData: object,         // Chart.js line chart data
  pieChartData: object,          // Chart.js pie chart data
  recentWatchlist: [],           // Last 5 watch list items
  refetch: function              // Reload all data
}
```

**Helper Functions (Internal):**

| Function | Purpose | Input | Output |
|----------|---------|-------|--------|
| `extractArray(response)` | Normalize API response | Response object | Data array |
| `normalizeStatus(status)` | Convert to uppercase | String | Uppercase status |
| `getStatusCounts(watchlist)` | Count by status | Watch list array | Object with counts |
| `buildStatusBarData(watchlist)` | Prepare bar chart data | Watch list array | Chart.js data object |
| `getLast7Dates()` | Generate date labels | - | Array of date strings |
| `buildWeeklyLineData(watchlist)` | Prepare line chart data | Watch list array | Chart.js data object |
| `extractGenre(movie)` | Extract primary genre | Movie object | Genre string |
| `buildGenrePieData(movies, watchlist)` | Prepare pie chart data | Movies + watchlist | Chart.js data object |
| `buildStats(movies, watchlist)` | Calculate statistics | Movies + watchlist | Stats object |
| `buildRecentWatchlist(watchlist)` | Get last 5 items | Watch list array | Array of 5 items |

**Usage Example:**
```javascript
import { useDashboardData } from '../data/data.js';

function MyComponent() {
  const { loading, error, stats, barChartData, refetch } = useDashboardData();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <>
      <p>Total Movies: {stats.totalMovies}</p>
      <button onClick={refetch}>Refresh</button>
    </>
  );
}
```

**Data Processing Flow:**
1. `useDashboardData()` calls `fetchMovies()` and `fetchWatchlist()` in parallel
2. Normalizes responses with `extractArray()`
3. Processes data using helper functions:
   - Calculates stats
   - Builds chart data for visualization
   - Extracts recent items
4. Returns all processed data

**Chart Data Structures:**

Bar Chart (Status Distribution):
```javascript
{
  labels: ['PLANNED', 'WATCHING', 'COMPLETED', 'DROPPED'],
  datasets: [{
    label: 'Count',
    data: [5, 3, 8, 2]
  }]
}
```

Line Chart (7-Day Activity):
```javascript
{
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Items Added',
    data: [0, 2, 1, 3, 0, 2, 1]
  }]
}
```

Pie Chart (Top 5 Genres):
```javascript
{
  labels: ['Sci-Fi', 'Drama', 'Action', 'Comedy', 'Horror'],
  datasets: [{
    label: 'Genre Distribution',
    data: [12, 10, 8, 6, 4]
  }]
}
```

---

## 🔧 Helper Functions Summary

### Authentication Helpers
- Login form validation and submission
- Register form validation and submission
- Token storage and retrieval

### Data Fetching Helpers
| Module | Function | Purpose |
|--------|----------|---------|
| `data.js` | `fetchMovies()` | Fetch all movies from backend |
| `data.js` | `fetchWatchlist()` | Fetch user's watch list |
| `data.js` | `useDashboardData()` | Hook for dashboard data management |

### Data Processing Helpers
| Module | Function | Purpose |
|--------|----------|---------|
| `data.js` | `extractArray()` | Normalize API responses |
| `data.js` | `getStatusCounts()` | Count items by status |
| `data.js` | `buildStatusBarData()` | Prepare status chart data |
| `data.js` | `buildWeeklyLineData()` | Prepare activity chart data |
| `data.js` | `buildGenrePieData()` | Prepare genre chart data |
| `data.js` | `buildStats()` | Calculate dashboard statistics |
| `data.js` | `buildRecentWatchlist()` | Get 5 most recent items |

### UI Helper Functions
| Module | Function | Purpose |
|--------|----------|---------|
| `Movies.jsx` | `showToast()` | Display notification |
| `ProtectedRoute.jsx` | Token validation | Guard protected routes |
| `NavBar.jsx` | Logout function | Clear auth state and redirect |

---

## 📦 npm Scripts

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint src"
}
```

---

## 🎨 Styling System

**Tailwind CSS:**
- Utility-first CSS framework
- Responsive design (`sm:`, `md:`, `lg:`, `xl:` breakpoints)
- Color palette for status badges and UI elements
- Flexbox and grid layouts

**Global Styles:**
- `index.css`: Tailwind directives and imports
- `App.css`: Application-specific styles

**Component-Specific:**
- Inline Tailwind classes
- Glassmorphism effects (`backdrop-blur-md`)
- Responsive spacing and padding

---

## 🚀 Performance Optimizations

1. **useMemo() for Filtering:**
   - Movies filtered efficiently in Movies.jsx
   - Prevents unnecessary re-renders

2. **Axios Interceptor:**
   - Single token injection point
   - Shared instance across app

3. **Lazy Rendering:**
   - Charts render only when data available
   - Loading states prevent flashing

4. **GSAP Animations:**
   - Optimized animations for smooth performance
   - Cached animations

---

## 🔐 Security Features

1. **JWT Token Management:**
   - Stored securely in localStorage
   - Sent via Authorization header
   - Validated by ProtectedRoute

2. **CORS:**
   - Backend CORS configured
   - Frontend requests authenticated

3. **Route Protection:**
   - ProtectedRoute guards private pages
   - Automatic redirect to login if unauthorized

4. **Input Validation:**
   - Form validation before submission
   - Backend validates all inputs

---

## 🧪 Testing Components

### Login Page Test:
```javascript
// 1. Fill form
input[email].value = "test@example.com";
input[password].value = "password123";

// 2. Click submit
button.click();

// 3. Verify token stored
localStorage.getItem('token') // Should exist

// 4. Verify redirect
window.location.pathname // Should be '/'
```

### Add to Watch List Test:
```javascript
// 1. Navigate to /movies
// 2. Click "Add to Watch List"
// 3. Fill form (status, rating, notes)
// 4. Click submit
// 5. Verify toast notification
// 6. Verify button changes to "Added ✓"
```

### Dashboard Test:
```javascript
// 1. Navigate to /home
// 2. Verify loading state disappears
// 3. Verify stat cards show data
// 4. Verify charts render
// 5. Click refresh button
// 6. Verify data updates
```

---

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend API not connecting | Verify backend running on `http://localhost:5001` |
| Token expires on refresh | Token in localStorage valid for 7 days |
| Charts not rendering | Ensure `useDashboardData()` data loaded |
| Styles not applying | Clear browser cache and rebuild with `npm run build` |
| Cannot add to watch list | Verify you're logged in and token valid |
| 404 on protected routes | Check token format (should have 3 dots) |

---

## 📚 File Dependencies

```
main.jsx
  ├── App.jsx
  │   ├── Login.jsx
  │   ├── Register.jsx
  │   ├── ProtectedRoute.jsx
  │   │   └── NavBar.jsx
  │   ├── HomePage.jsx
  │   │   ├── BarChart.jsx
  │   │   ├── LineChart.jsx
  │   │   ├── PieChart.jsx
  │   │   └── data.js
  │   ├── Movies.jsx
  │   │   └── data.js
  │   └── WatchList.jsx
  │       └── data.js
  └── Styling
      ├── index.css (Tailwind)
      └── App.css
```

---

## 🔗 Related Documentation

- **Backend Docs:** See [Backend/DOCUMENTATION.md](../../Backend/DOCUMENTATION.md)
- **React Router:** https://reactrouter.com/
- **Tailwind CSS:** https://tailwindcss.com/
- **Axios:** https://axios-http.com/
- **Chart.js:** https://www.chartjs.org/
- **GSAP:** https://greensock.com/gsap/

---

## 🎓 Getting Started Quick Reference

```bash
# 1. Install dependencies
npm install

# 2. Make sure backend is running
# Terminal 1: cd Backend && npm run dev

# 3. Start frontend dev server
npm run dev

# 4. Open http://localhost:5173

# 5. Register a new account
# 6. Explore movies and create a watch list
# 7. View dashboard with analytics
```

---

## 📝 Component Communication Flow

```
App.jsx (Router)
  ↓
ProtectedRoute (Auth Guard)
  ↓
NavBar.jsx (Navigation)
  ↓
HomePage.jsx / Movies.jsx / WatchList.jsx (Pages)
  ↓
BarChart / LineChart / PieChart (Chart Components)
  ↓
data.js (API & Data Processing)
  ↓
Backend API (Express Server)
```

---

**Last Updated:** April 21, 2026
**Version:** 1.0.0
