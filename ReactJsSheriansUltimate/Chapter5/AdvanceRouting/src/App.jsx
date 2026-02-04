import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Product from './pages/Product'
import Men from './pages/Men'
import Women from './pages/Women'
import NotFound from './pages/NotFound'
import Courses from './pages/Courses'
import CourseDetai from './pages/CourseDetai'

function App() {
  return (
    <div className="bg-black min-h-screen w-full text-white flex flex-col">
      
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/product" element={<Product />}>
          <Route path="men" element={<Men />} />
          <Route path="women" element={<Women />} />
        </Route>
     {/* me chahta hun me courses . kch bhi likhun to courses details hi jaye */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:Courseid" element={<CourseDetai />} />
{/* courses ke bad koi bhi id likhte hen to yahan jayega */}


        {/* agar user koi bhi unknown route daal de */}
        <Route path="*" element={<NotFound />} />
      </Routes>
   
      <Footer />

    </div>
  )
}

export default App
