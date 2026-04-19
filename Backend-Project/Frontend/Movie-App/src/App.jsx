import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Movies from './pages/Movies';
import NavBar from './components/NavBar';
import Login from './auth/Login';
import Register from './auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Watchlist from './pages/WatchList';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
  
        {/* Protected Route */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
    <NavBar />
            
              <Movies />
            </ProtectedRoute>
          } 
        />
        
        {/* You can add more protected routes here */}
            <Route 
          path="/movies" 
          element={
            <ProtectedRoute>
              <NavBar />
              <Movies />
            </ProtectedRoute>
          } 
        />
            <Route 
          path="/watchlist" 
          element={
            <ProtectedRoute>
              <NavBar />
              <Watchlist />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;