import React, { useState, Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Environment, ContactShadows } from '@react-three/drei'
import { Route, Routes, Link, useParams } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'

// 🎨 ULTRA-VIBRANT MERCURY BALL (Click-through optimization)
function MercuryBall({ color, position, speed, distort, onClick }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.scale.setScalar(0.9 + Math.sin(time * speed) * 0.08);
  });

  return (
    <Float speed={speed} rotationIntensity={2} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} onClick={onClick} className="cursor-pointer">
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial
          color={color}
          speed={speed * 2}
          distort={distort}
          radius={1}
          metalness={1}
          roughness={0}
          emissive={color}
          emissiveIntensity={1} // Max Glow for that pop!
          clearcoat={1}
        />
      </mesh>
    </Float>
  )
}

function App() {
  const [info, setInfo] = useState(null)

  // 📝 YOUR ORIGINAL LOGIC + NEON COLORS
  const bubbles = [
    { id: 1, title: "Browser Router", color: "#00d2ff", pos: [-10, 5, -2], s: 2, d: 0.3,
      desc: "browser router is a client side routing system that does keep the trak of history. it uses the history api for routing" },
    { id: 2, title: "Hash Router", color: "#ff007f", pos: [10, 5, -2], s: 1.5, d: 0.4,
      desc: "hash router: server doesnot know which route we are in, it's not sent to the server" },
    { id: 3, title: "Memory Router", color: "#39ff14", pos: [-12, -4, 0], s: 2.5, d: 0.5,
      desc: "memory router: stores it in memory. stores all entries in memory. similar to youtube single page application" },
    { id: 4, title: "Link Power", color: "#fff01f", pos: [12, -4, 0], s: 1.8, d: 0.3,
      desc: "a tag ki jaga link use kro. everything comes in place. abhi still reloading horhi he agar 'a' use kiya." },
    { id: 5, title: "Dynamic Route", color: "#bc13fe", pos: [0, 8, -4], s: 1.2, d: 0.6,
      desc: "Dynamic routes like /product/:id allow you to use the same component for different data using useParams()!" }
  ]

  return (
    <div className="min-h-screen w-screen bg-[#010101] relative overflow-hidden font-sans">
      
      {/* 🌌 THE 3D SCENE (Background remains interactive) */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <Suspense fallback={null}>
            <Environment preset="night" />
            {bubbles.map((b) => (
              <MercuryBall key={b.id} color={b.color} position={b.pos} speed={b.s} distort={b.d} onClick={() => setInfo(b)} />
            ))}
            <ContactShadows position={[0, -10, 0]} opacity={0.5} scale={50} blur={2} />
          </Suspense>
        </Canvas>
      </div>

      {/* 🏗️ INTERACTIVE UI LAYER (The Fix: pointer-events-none on containers) */}
      <div className="relative z-10 flex flex-col items-center min-h-screen pointer-events-none">
        
        {/* Persistent Viewport (Header) - Now Click-Through! */}
        <header className="pt-12 pb-6 text-center">
          <h1 className="text-white font-black text-7xl tracking-tighter italic drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            ULTRA<span className="text-[#ff007f] drop-shadow-[0_0_20px_#ff007f]">MERCURY</span>
          </h1>
          <p className="text-slate-700 font-mono text-[10px] tracking-[1.2em] uppercase mt-4">No Obstruction Mode</p>
        </header>

        {/* Dynamic Route Viewport - Only content is clickable */}
        <main className="w-full max-w-3xl px-6 mb-auto pt-10 pointer-events-auto">
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/About' element={<About/>} />
            <Route path='/Contact' element={<Contact/>} />
            <Route path='/product/:id' element={<Product/>} />
            <Route path='*' element={<div className="text-white text-center text-8xl font-black opacity-5">404</div>} />
          </Routes>
        </main>

        {/* 🚦 NAVIGATION CONTROL PANEL (The Real Estate Champion) */}
        <div className="w-full max-w-7xl p-10 bg-white/[0.02] backdrop-blur-xl border-t border-white/10 rounded-t-[5rem] pointer-events-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <div className="space-y-4">
              <h3 className="text-[#39ff14] font-black text-[10px] uppercase italic tracking-[0.3em]">SPA Protocol</h3>
              <div className="flex flex-wrap gap-2">
                <Link to="/" className="px-6 py-3 bg-[#39ff14] text-black font-black rounded-2xl text-[10px] shadow-[0_0_20px_#39ff14]">HOME</Link>
                <Link to="/About" className="px-6 py-3 bg-white text-black font-black rounded-2xl text-[10px]">ABOUT</Link>
              </div>
            </div>

            <div className="space-y-4 text-center">
              <h3 className="text-[#00d2ff] font-black text-[10px] uppercase italic tracking-[0.3em]">Dynamic Segments</h3>
              <div className="flex justify-center gap-2">
                <Link to="/product/Nike-Jordan" className="px-6 py-3 bg-[#00d2ff] text-black font-black rounded-2xl text-[10px]">JORDAN</Link>
                <Link to="/product/Tesla-S" className="px-6 py-3 bg-[#00d2ff] text-black font-black rounded-2xl text-[10px]">TESLA</Link>
              </div>
            </div>

            <div className="space-y-4 text-right">
              <h3 className="text-[#ff007f] font-black text-[10px] uppercase italic tracking-[0.3em]">Legacy System</h3>
              <div className="flex justify-end gap-2">
                <a href="/" className="px-6 py-3 bg-red-500/10 text-red-500 font-black rounded-2xl text-[10px] border border-red-500/20">FORCE REFRESH</a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 🎀 THE ORIGINAL COMMENT MODAL */}
      {info && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-8 pointer-events-auto">
          <div className="w-full max-w-xl bg-slate-900 border-4 rounded-[4rem] p-16 relative shadow-2xl" style={{ borderColor: info.color }}>
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-2xl animate-bounce" style={{ backgroundColor: info.color }}>
                💡
            </div>
            <h2 className="text-5xl font-black mb-8 italic text-center uppercase" style={{ color: info.color }}>{info.title}</h2>
            <div className="bg-black/50 p-10 rounded-[2rem] border border-white/5">
                <p className="text-white font-bold text-2xl text-center leading-relaxed italic">"{info.desc}"</p>
            </div>
            <button 
              onClick={() => setInfo(null)}
              className="mt-12 w-full py-6 bg-white text-black rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              Resume Journey
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App