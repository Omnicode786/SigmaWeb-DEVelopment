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
<div className="min-h-screen bg-[#0a0a0c] text-white font-sans">
  {/* Modern Sticky Header */}
  <header className="sticky top-0 z-50 backdrop-blur-md bg-black/60 border-b border-white/10 p-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <h1 className="text-4xl font-black tracking-tighter">
        POKE<span className="text-red-500 underline decoration-4">DEX</span>
      </h1>
      
      <div className="flex items-center gap-6 bg-white/5 px-6 py-2 rounded-full border border-white/10">
        <span className="text-gray-400 text-sm">Range</span>
        <span className="font-mono text-xl text-amber-400">{Start} — {End}</span>
      </div>
    </div>
  </header>

  <main className="max-w-7xl mx-auto p-8 pb-32">
    {loading ? (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
        <OrbitProgress color="#ef4444" size="medium" />
        <p className="text-gray-500 animate-pulse font-mono">Synchronizing Data...</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
        {Data.map((elem) => (
          <PokeCard key={elem.id} {...elem} />
        ))}
      </div>
    )}
  </main>

  {/* Floating Navigation */}
  <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4 bg-gray-900/80 backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-2xl">
    <button 
      onClick={() => { if(Start > 1) { setStart(Start-50); setEnd(End-50); }}}
      className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95 disabled:opacity-20"
      disabled={Start === 1}
    >
      PREVIOUS
    </button>
    <button 
      onClick={() => { setStart(End+1); setEnd(End+50); }}
      className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-500 transition-all active:scale-95 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
    >
      NEXT STAGE
    </button>
  </footer>
</div>

    </>
  )
}

export default App
