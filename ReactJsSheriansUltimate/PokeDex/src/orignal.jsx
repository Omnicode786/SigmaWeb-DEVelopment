import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import { div, i } from 'framer-motion/client'
import PokeCard from './components/PokeCard'
import { useEffect } from 'react'
import { Mosaic, OrbitProgress } from 'react-loading-indicators'

// axios detailing
// post api sends request to the backend
// delete basically account delete 
// access token refresh token
// if some one logs in they get both thes token 
// refresh token stays for 15 mins
// where as access token remains for months 

// all these will come from the cookies
// when the refresh token expires a new request runs i will get the refresh token on the basis of the acess token

// if things like images are taking too time then fix it by useing lazy laoding

// i have also added 
// npm install react-loading-indicators
// so when the data is still loaded we get this loading screen


function App() {
  const [count, setCount] = useState(0)
  const [Start, setStart] = useState(1);
  const [End, setEnd] = useState(50);
  const [Data, setData] = useState([])
const [loading, setLoading] = useState(true);


const getData = async () => {
  setLoading(true);
  setData([]);

  const requests = [];
  for (let i = Start; i < End; i++) {
    const res = axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
    requests.push(res);
  }
    const pokemons = await Promise.all(requests);
    const pokemonData = pokemons.map((res) => res.data)
    setData(pokemonData);

  setTimeout(() => {
    setLoading(false);
  }, 500);
};

useEffect(
  ()=> {
    setData([])
    getData();
  },[Start, End]
)
  return (
    <>
    <div>
    <div className='w-full flex flex-col items-center h-full bg-gray-700'>
      <h1 className='text-white font-semibold text-6xl p-5 text-center'><span className='text-red-600 font-bold me-2'>Poke</span>dex</h1>
      <h1 className='font-bold text-6xl p-3'>{Start} - {End}</h1>
   
    </div>
<div className='h-screen bg-gray-950 m-5 p-2 pt-10 overflow-auto  rounded-xl'>
{loading ? (
  <div className='flex justify-center items-center w-full h-full'>
    <OrbitProgress color="#32cd32" size="medium" />
  </div>
) : (
  <div className='overflow-auto gap-3 flex flex-wrap'>
    {Data.map((elem, idx) => (
      <PokeCard key={idx} {...elem} />
    ))}
  </div>
)}

</div>


<div className='absolute fixed top-[86%] left-1/2 -translate-x-1/2  p-3  w-full '>
<div className='flex justify-center items-centerp-2'>
  <button onClick={() => {
    if (Start > 1){
 setStart(Start-50);
    setEnd(End-50);
  
    }
   
  }} className='font-bold text-lg bg-amber-300 w-30  rounded-lg  hover:bg-amber-400 active:scale-95 text-black p-5 m-2'>Prev</button>
<button  onClick={() => {
    setStart(End+1);
    setEnd(End+50);
  }} className='font-bold text-lg bg-amber-300 w-30  active:scale-95 hover:bg-amber-400  rounded-lg text-black p-3 m-2'>Next</button>
</div>

</div>
    </div>


    </>
  )
}

export default App
