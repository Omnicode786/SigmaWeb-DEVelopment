import React from "react";
import SearchBar from "./components/SearchBar";
import Tabs from "./components/Tabs";
import ResultGrid from "./components/ResultGrid";
import {Route, Routes, Link} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import { ToastContainer } from "react-toastify";
import NavBar from './components/NavBar';


function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center p-6">
    <ToastContainer/> 
    <NavBar/>
   

<Routes>

  <Route path="/" element={<HomePage/>}/>
  <Route path="/collection" element={<CollectionPage/>}/>
</Routes>

      {/* Search Bar */}
  
    </div>
  );
}

export default App;
