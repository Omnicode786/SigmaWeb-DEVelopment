import React from "react";

function PokeCard({ data }) {
  if (!data) return null;

  return (
    <div
      className="
        w-64 p-4
        rounded-xl
        border-4 border-yellow-400
        bg-gradient-to-b from-red-500 to-red-600
        shadow-[6px_6px_0px_#000]
        font-mono
      "
    >
      {/* Image Area */}
      <div className="h-28 flex items-center justify-center bg-white border-2 border-black rounded-md mb-3">
        <img
          src={data.sprites.versions["generation-v"]["black-white"].animated.front_default
}
          alt={data.name}
          className="w-24 h-24 image-pixelated"
        />
      </div>

      {/* Pokémon Name */}
      <h2 className="text-center text-lg font-bold uppercase tracking-wide">
        {data.name}
      </h2>

      {/* Types */}
      <div className="flex justify-center gap-2 mt-2">
        {data.types.map((t) => (
          <span
            key={t.type.name}
            className="px-2 py-[2px] text-xs text-black border border-black rounded bg-white capitalize"
          >
            {t.type.name}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-3 text-xs">
        {data.stats.map((stat) => (
          <div
            key={stat.stat.name}
            className="flex justify-between border-b border-black"
          >
            <span className="capitalize">{stat.stat.name}</span>
            <span>{stat.base_stat}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-3 text-[10px] text-center border-t border-black pt-1">
        HP {data.stats.find((s) => s.stat.name === "hp").base_stat} • #{data.id}
      </div>
    </div>
  );
}

export default PokeCard;
