import React from 'react'
import { Link,useNavigate } from 'react-router-dom'


const Navbar = () => {
const navigate = useNavigate();

  return (
    <div  className='flex bg-cyan-600 justify-between p-4'  >
<h2 className='font-bold text-2xl'>
    Muzammil Alam
</h2>
<div className='flex gap-4'>



{/* if we need to do back like back you know dude */}

<button
onClick={()=>{navigate(-1)}}
className='px-2 py-2 bg-red-400 rounded m-2 cursor-pointer active:scale-90'
>Back</button>


{/* similarly if i need to do forward  */}
<button
onClick={()=>{navigate(+1)}}
className='px-2 py-2 bg-red-400 rounded m-2 cursor-pointer active:scale-90'
>Forward</button>
<Link className='font-semibold text-lg' to='/'>Home</Link>
<Link className='font-semibold text-lg' to='/about'>About</Link>
<Link className='font-semibold text-lg' to='/product'>Product</Link>
<Link className='font-semibold text-lg' to='/courses'>Courses</Link>


</div>

    </div>
  )
}

export default Navbar