import { useParams, useNavigate } from 'react-router-dom';

function Product() {
  const { id } = useParams(); // URL se ID nikalne ka magic
  const navigate = useNavigate();

  return (
    <div className="p-12 bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-cyan-400/30 text-center shadow-[0_0_50px_rgba(34,211,238,0.1)]">
      <h2 className="text-cyan-400 font-black text-xs uppercase tracking-widest mb-2 italic">Dynamic Station</h2>
      <h1 className="text-6xl font-black text-white italic mb-6">ITEM #{id}</h1>
      <p className="text-slate-400 mb-8 font-bold italic text-sm italic">"Ye ID humne URL se dynamically khenchi hai!"</p>
      <button 
        onClick={() => navigate('/')}
        className="px-10 py-4 bg-cyan-400 text-black rounded-full font-black hover:scale-105 transition-all"
      >
        BACK TO BASE
      </button>
    </div>
  )
}

export default Product