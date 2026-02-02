import React from "react";

const PokeCard = (props) => {
  const TYPE_COLORS = {
  fire: 'bg-red-500', grass: 'bg-green-500', water: 'bg-blue-500',
  bug: 'bg-lime-500', normal: 'bg-gray-400', poison: 'bg-purple-500',
  electric: 'bg-yellow-400', ground: 'bg-amber-600', fairy: 'bg-pink-400',
  fighting: 'bg-orange-700', psychic: 'bg-pink-600', rock: 'bg-stone-600',
  ghost: 'bg-indigo-800', ice: 'bg-cyan-400', dragon: 'bg-violet-600'
};
  const mainType = props.types[0].type.name;
  const colorClass = TYPE_COLORS[mainType] || 'bg-gray-500';
  const animatedSprite = props.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default;
  // Fallback to static if animated doesn't exist
  const displayImage = animatedSprite || props.sprites.front_default;
  
  return (
    <div className="group relative bg-gray-900 border border-gray-800 rounded-2xl p-4 w-72 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
      {/* ID Badge */}
      <span className="absolute top-4 right-4 text-gray-600 font-mono font-bold">#{props.id}</span>
      
      {/* Image Container */}
      <div className={`relative rounded-xl ${colorClass} bg-opacity-20 p-5 mb-4 overflow-hidden`}>
        <img 
          className="w-full h-40 object-contain z-10 relative drop-shadow-2xl" 
          src={displayImage} 
          alt={name} 
        />
        <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${colorClass} rounded-full blur-3xl opacity-30`}></div>
      </div>

      {/* Info */}
      <h2 className="text-2xl capitalize font-black text-white mb-1">{props.name}</h2>
      
      <div className="flex gap-2 mb-4">
        {props.types.map(t => (
          <span key={t.type.name} className={`text-[10px] px-2 py-0.5 rounded-md uppercase font-bold text-white ${TYPE_COLORS[t.type.name]}`}>
            {t.type.name}
          </span>
        ))}
      </div>

      {/* Mini Stats */}
      <div className="space-y-2 border-t border-gray-800 pt-3">
        {props.stats.slice(0, 3).map(stat => (
          <div key={stat.stat.name} className="flex items-center justify-between text-[11px]">
            <span className="text-gray-400 uppercase">{stat.stat.name.replace('special-', 'S.')}</span>
            <div className="w-32 h-1.5 bg-gray-800 rounded-full ml-2 overflow-hidden">
              <div 
                className={`h-full ${colorClass}`} 
                style={{ width: `${(stat.base_stat / 150) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokeCard