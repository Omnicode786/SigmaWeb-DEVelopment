import React, { useState, Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Environment } from '@react-three/drei'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementAmount } from './store/features/counterSlice'
import './index.css'

// 🎨 SHINY REDUX BUBBLE
function ReduxBubble({ color, position, speed, onClick }) {
  const meshRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.scale.setScalar(0.9 + Math.sin(t * speed) * 0.17);
  });

  return (
    <Float speed={speed} rotationIntensity={2}>
      <mesh ref={meshRef} position={position} onClick={onClick} className="cursor-pointer">
        <sphereGeometry args={[1, 28,488]} />
        <MeshDistortMaterial 
          color={color} speed={speed * 2} distort={0.4} 
          metalness={1.5} roughness={0} emissive={color} emissiveIntensity={0.4} 
        />
      </mesh>
    </Float>
  )
}

function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  const [Amount, setAmount] = useState(0);
  const [info, setInfo] = useState(null);

  // 📝 YOUR ORIGINAL REDUX LOGIC NOTES
  const reduxNotes = [
    { id: 1, title: "Dispatch vs Selector", color: "#38bdf8", pos: [-10, 4, 0], s: 2,
      desc: "value ko use bhi to krna hena isillie we use use selector. show kelie selector, kaam kelie dispatch." },
    { id: 2, title: "Action Dispatch", color: "#f472b6", pos: [10, 4, 0], s: 1.5,
      desc: "mene ye action perform krdia ab jo krna he krdo dispatch. Action dispatch through the event that was handled." },
    { id: 3, title: "Reducer Logic", color: "#4ade80", pos: [-12, -4, 0], s: 2.5,
      desc: "reducers are functions if somebody wants to change the theme. data was stored in redux store, reducer changed it, now UI updates." },
    { id: 4, title: "Store Configuration", color: "#fbbf24", pos: [12, -4, 0], s: 1.8,
      desc: "configureStore expects a REDUCER FUNCTION, not the entire slice. slice.reducer ✅" },
    { id: 5, title: "Payload Power", color: "#a78bfa", pos: [0, 8, -4], s: 1.2,
      desc: "incrementAmount: (state, actions) => state.value += actions.payload. Reducers accept data through action parameters." }
  ];

  return (
    <div className="min-h-screen w-screen bg-[#010101] relative overflow-hidden font-sans">
      
      {/* 🌌 3D BACKGROUND (Click-Through) */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <Environment preset="night" />
            {reduxNotes.map((n) => (
              <ReduxBubble key={n.id} color={n.color} position={n.pos} speed={n.s} onClick={() => setInfo(n)} />
            ))}
          </Suspense>
        </Canvas>
      </div>

      {/* 🏗️ INTERACTIVE UI LAYER */}
      <div className="relative z-10 flex flex-col items-center min-h-screen pointer-events-none">
        
        <header className="pt-16 pb-6 text-center">
          <h1 className="text-white font-black text-8xl tracking-tighter italic drop-shadow-[0_0_30px_#f472b6]">
            REDUX<span className="text-[#38bdf8]">LAB</span>
          </h1>
          <p className="text-slate-600 font-mono text-xs tracking-[1em] uppercase mt-4">State Management Galaxy</p>
        </header>

        {/* COUNTER DISPLAY & CONTROLS */}
        <main className="w-full max-w-2xl px-6 mb-auto pt-10 pointer-events-auto text-center">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-16 shadow-2xl">
            <h2 className="text-slate-400 font-black text-xs uppercase tracking-widest mb-4 italic">Current State (Selector)</h2>
            <h1 className="text-9xl font-black text-white mb-10 tabular-nums">{count}</h1>
            
            <div className="flex justify-center gap-4 mb-10">
              <button onClick={() => dispatch(increment())} className="px-10 py-5 bg-[#f472b6] text-black font-black rounded-3xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_#f472b6]">INCREMENT</button>
              <button onClick={() => dispatch(decrement())} className="px-10 py-5 bg-white text-black font-black rounded-3xl hover:scale-105 active:scale-95 transition-all">DECREMENT</button>
            </div>

            <div className="flex flex-col gap-4">
              <input 
                type="number" 
                value={Amount}
                onChange={(e) => setAmount(Number(+e.target.value))}
                className="bg-black/50 border-2 border-white/10 p-6 rounded-3xl text-center text-white font-black text-2xl focus:border-[#38bdf8] outline-none transition-all"
                placeholder="Enter Amount"
              />
              <button 
                onClick={() => dispatch(incrementAmount(Amount))}
                className="w-full py-6 bg-[#38bdf8] text-black font-black rounded-3xl hover:shadow-[0_0_30px_#38bdf8] transition-all uppercase tracking-widest"
              >
                Increment by amount
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* 🎀 REDUX LOGIC MODAL */}
      {info && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-8 pointer-events-auto">
          <div className="w-full max-w-xl bg-slate-900 border-4 rounded-[4rem] p-16 relative shadow-2xl" style={{ borderColor: info.color }}>
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-2xl animate-pulse" style={{ backgroundColor: info.color }}>
                📦
            </div>
            <h2 className="text-5xl font-black mb-8 italic text-center uppercase" style={{ color: info.color }}>{info.title}</h2>
            <div className="bg-black/50 p-10 rounded-[2rem] border border-white/5">
                <p className="text-white font-bold text-2xl text-center leading-relaxed italic italic">"{info.desc}"</p>
            </div>
            <button 
              onClick={() => setInfo(null)}
              className="mt-12 w-full py-6 bg-white text-black rounded-[2rem] font-black uppercase tracking-widest active:scale-95 transition-all shadow-xl"
            >
              Resume Coding
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App