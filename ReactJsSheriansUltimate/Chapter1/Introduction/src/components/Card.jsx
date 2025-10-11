function Card({
  name = "Ava Harper",
  title = "Product Designer",
  role = "Design",
  image = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&q=80&auto=format&fit=crop&ixlib=rb-4.0.3"
}) {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-xl border border-gray-800 hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center text-center m-4 w-70">
      <div className="relative">
        <img
          className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-gray-700 shadow-md"
          src={image}
          alt={`${name}'s avatar`}
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/10 opacity-10"></div>
      </div>
      <h2 className="text-lg font-semibold text-gray-100">{name}</h2>
      <p className="text-sm text-gray-400 mb-2">{title}</p>
      <span className="text-xs font-medium text-gray-200 bg-gray-800 rounded-full px-3 py-1 border border-gray-700">
        {role}
      </span>

      {/* Optional subtle glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
}

export default Card;
