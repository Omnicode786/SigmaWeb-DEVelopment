import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Activity, Bug, Database, Layers, Sparkles, Terminal, ArrowRight } from 'lucide-react'

export default function App() {
  const [pokemonData, setPokemonData] = useState([])
  const [textData, setTextData] = useState([])
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({ time: 0, count: 0 })

  // 🧪 THE TEXT LAB ENGINE
  const getRawData = async () => {
    console.log("🚀 Lab Engine Starting...");
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      // Filter logic: UserID 9's titles only
      let filtered = response.data.filter(e => e.userId === 9).slice(0, 10);
      setTextData(filtered);
      console.log("📦 Data Filtered & Loaded");
    } catch (err) { console.error("❌ Lab Error:", err); }
  }

  // ⚡ THE POKEMON QUANTUM ENGINE
  const getPokemonData = async (limit) => {
    const startTime = performance.now();
    setLoading(true);
    setPokemonData([]); // Clear previous
    
    const requests = [];
    for (let num = 1; num < limit; num++) {
      requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`));
    }

    try {
      const responses = await Promise.all(requests);
      const formattedData = responses.map(res => ({
        name: res.data.name,
        image: res.data.sprites.other['official-artwork'].front_default, // High quality artwork
        id: res.data.id,
        type: res.data.types[0].type.name
      }));
      
      const endTime = performance.now();
      setStats({ time: ((endTime - startTime) / 1000).toFixed(2), count: formattedData.length });
      setPokemonData(formattedData);
      console.log("🎮 Pokemon Quantum Sync Complete!");
    } catch (err) { console.error("❌ Sync Error:", err); } 
    finally { setLoading(false); }
  }

  return (
    <div className="w-screen h-screen bg-[#020617] flex overflow-hidden font-sans text-slate-300">
      
      {/* 🌌 BACKGROUND NEON BLOBS */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 blur-[150px] pointer-events-none" />

      {/* 📜 SECTION 1: THE DATA TERMINAL (Left) */}
      <section className="w-[380px] h-full border-r border-white/5 bg-slate-950/50 backdrop-blur-xl p-8 flex flex-col z-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
            <Terminal className="text-blue-400 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tighter uppercase">Data Terminal</h2>
            <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Async Logic Lab</p>
          </div>
        </div>

        <button 
          onClick={getRawData}
          className="group relative w-full py-5 bg-white/[0.03] hover:bg-blue-600 text-white rounded-3xl font-black transition-all border border-white/10 hover:border-blue-400 overflow-hidden mb-8"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            RUN JSON FETCH <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence>
            {textData.map((post, i) => (
              <motion.div 
                key={post.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-blue-500/30 transition-colors group"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full">UID: {post.userId}</span>
                  <span className="text-[10px] text-slate-600 font-mono">ID: {post.id}</span>
                </div>
                <h4 className="text-slate-300 text-sm font-bold capitalize leading-relaxed group-hover:text-white transition-colors">{post.title}</h4>
              </motion.div>
            ))}
          </AnimatePresence>
          {textData.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-slate-700 italic text-sm">
              <Database size={40} className="mb-4 opacity-10" />
              Waiting for execution...
            </div>
          )}
        </div>
      </section>

      {/* 🎮 SECTION 2: THE QUANTUM GRID (Right) */}
      <section className="flex-1 h-full p-10 overflow-y-auto relative z-10">
        
        {/* HEADER AREA */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-16 sticky top-0 z-40 py-4 bg-[#020617]/80 backdrop-blur-md">
          <div className="flex items-center gap-6">
            <div className="h-20 w-1 bg-red-600 rounded-full hidden md:block" />
            <div>
              <h1 className="text-7xl font-black text-white tracking-tighter italic leading-none">
                POKE<span className="text-red-600">API</span>
              </h1>
              <div className="flex gap-4 mt-2">
                <span className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase">Quantum Fetch Engine</span>
                {stats.count > 0 && (
                  <span className="text-[10px] font-black text-emerald-500 tracking-[0.1em] uppercase bg-emerald-500/10 px-2 rounded-md border border-emerald-500/20">
                    Sync: {stats.time}s • {stats.count} Units
                  </span>
                )}
              </div>
            </div>
          </div>

          <button 
            onClick={() => getPokemonData(151)} // 50 items for super smooth visual
            disabled={loading}
            className="relative h-20 px-10 bg-red-600 hover:bg-red-500 disabled:bg-slate-900 text-white rounded-3xl font-black text-xl transition-all flex items-center gap-4 overflow-hidden shadow-[0_20px_50px_rgba(220,38,38,0.2)] active:scale-95"
          >
            {loading ? <div className="animate-spin rounded-full h-6 w-6 border-4 border-white/20 border-t-white" /> : <Zap size={24} className="fill-current" />}
            {loading ? "QUANTUM SYNC..." : "LAUNCH SYNC"}
          </button>
        </div>

        {/* 🧩 THE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-32">
          <AnimatePresence>
            {pokemonData.map((pokemon, idx) => (
              <motion.div 
                key={pokemon.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                whileHover={{ scale: 1.02 }}
                className="relative bg-white/[0.03] border border-white/5 p-8 rounded-[3rem] group overflow-hidden"
              >
                {/* Background ID Glow */}
                <span className="absolute -top-4 -right-2 text-8xl font-black text-white/[0.02] italic select-none">#{pokemon.id}</span>
                
                <div className="relative z-10 text-center">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full scale-50 group-hover:scale-110 transition-transform duration-700" />
                    <img 
                      src={pokemon.image} 
                      alt={pokemon.name} 
                      className="w-full h-full relative z-10 drop-shadow-2xl group-hover:rotate-12 transition-transform duration-500"
                    />
                  </div>
                  
                  <span className="text-[10px] font-black text-red-500 bg-red-500/10 px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block border border-red-500/20">
                    {pokemon.type}
                  </span>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-red-500 transition-colors">
                    {pokemon.name}
                  </h3>
                </div>

                {/* Bottom Border Accent */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* EMPTY STATE */}
        {pokemonData.length === 0 && !loading && (
          <div className="h-[50vh] flex flex-col items-center justify-center text-slate-800">
            <div className="relative">
              <Sparkles size={80} className="mb-6 opacity-5 animate-pulse" />
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
            </div>
            <p className="text-2xl font-black uppercase tracking-[0.5em] italic opacity-20 text-center leading-relaxed">
              System Offline <br /> <span className="text-sm font-bold tracking-[0.2em] not-italic">Awaiting Engine Ignition</span>
            </p>
          </div>
        )}
      </section>

      {/* 🧬 FLOATING STATUS BADGE */}
      <div className="fixed bottom-10 right-10 z-50">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 px-6 py-4 rounded-[2rem] flex items-center gap-4 shadow-2xl">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-500 animate-ping' : 'bg-emerald-500'}`} />
            <span className="text-[10px] font-black text-white tracking-widest uppercase">{loading ? 'Processing' : 'Standby'}</span>
          </div>
          <div className="w-[1px] h-4 bg-white/10" />
          <span className="text-[10px] font-black text-slate-500 uppercase">Requests: {stats.count}</span>
        </div>
      </div>
    </div>
  )
}