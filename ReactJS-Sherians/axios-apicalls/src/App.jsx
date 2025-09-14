import axios from 'axios'
import { useState } from 'react'
import Card from './components/Card'


function App() {
  const [data,setData] = useState([]);


  const getData =async () =>{
console.log("hello")
const response = await axios.get('https://picsum.photos/v2/list')  

setData(response.data);


console.log(response.data)

}


  return (
    <>
    <div className='w-f p-2 flex'>
    <button 
    onClick={getData}
    className='bg-red-500 text-white font-semibold rounded-2xl text-2xl px-3 py-3 active:scale-95'>Get Data</button>
    
    </div>
    <div className='flex flex-wrap m-3 items-center '>
     {data.map(function(elem,index){
         return  <Card key={index} {...elem}/> 
})}

</div>
    </>
  )
}

export default App
