
import { Route, Routes } from 'react-router-dom'
import Card from './components/Card'
import Nav from './components/Nav'
import Home from './components/Home'
import Product from './components/Product'
import About from './components/About'
import Contact from './components/Contact'

const props = [
  {
    name: "Muzammil Alam",
    age: "19",
    description:
      "Hi, Im Muzammil Alam, a first-semester Electronics Engineering student at NED University, Karachi. With a solid foundation in programming and a keen interest in cutting edge technology, I thrive at the intersection of hardware and software innovation.",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQHUo7bgsvBwew/profile-displayphoto-crop_800_800/B4DZhgB2bUGkAU-/0/1753957756704?e=1760572800&v=beta&t=6_SdlHEGIVnHJcJ9c-iUBKhW39rG3dDZlvtqaJLd-JA",
  },
 {
    name: "Ayan Khan",
    age: "22",
    description:
      "Computer Science student with a focus on backend development and cloud systems. Loves solving complex problems.",
    image:
      "https://randomuser.me/api/portraits/men/45.jpg",
    profile: "https://www.linkedin.com/in/example-ayan/"
  },
  {
    name: "Fatima Ahmed",
    age: "20",
    description:
      "Frontend developer and UI/UX enthusiast. Exploring creative ways to design engaging digital experiences.",
    image:
      "https://randomuser.me/api/portraits/women/65.jpg",
    profile: "https://www.linkedin.com/in/example-fatima/"
  }
]
for (let i = 4; i <= 50; i++) {
  props.push({
    name: `Person ${i}`,
    age: 18 + (i % 10),
    description: `This is a dummy description for Person ${i}, showcasing how React props and mapping can handle large datasets easily.`,
    image: `https://randomuser.me/api/portraits/men/${i}.jpg`,
    profile: `https://www.linkedin.com/in/person-${i}`
  })
}


function App() {



  return (
<>
    <Nav/>

<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/product' element={<Product/>}/>
  <Route path='/about' element={<About/>}/>
  <Route path='/contact' element={<Contact/>}/>

 </Routes>

        <div className='w-full flex mt-22 items-center min-h-80 flex-wrap bg-gray-100'>
        {props.map((elem,index)=>(
          <Card key={index} {...elem}/>
        ))}

        </div>



   
   
     </>
  )
}

export default App
