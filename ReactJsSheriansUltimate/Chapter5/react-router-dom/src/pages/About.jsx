import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="p-12 bg-white/5 backdrop-blur-2xl rounded-[4rem] border border-white/20 text-center shadow-2xl">
      <h1 className="text-6xl font-black text-white italic mb-6">ABOUT 📖</h1>
      <p className="text-slate-400 mb-8 font-bold italic text-sm">"React Router is like a map, and useNavigate is your GPS."</p>
      <button 
        onClick={() => navigate('/Contact')}
        className="flex items-center gap-3 mx-auto px-10 py-4 bg-white text-black rounded-full font-black hover:bg-purple-400 transition-all active:scale-90"
      >
        CONTACT ME <ArrowRight size={20} />
      </button>
    </div>
  )
}