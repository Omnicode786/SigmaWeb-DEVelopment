function Card(props) {
  return (
    <div className="bg-white h-120 shadow-lg rounded-2xl overflow-hidden w-72 hover:shadow-2xl transition duration-300 m-3 ">
      {/* Profile Image */}
      <img
        src={props.download_url}
        alt={props.author}
        className="w-full h-44 object-cover"
      />

      {/* Content */}
      <div className="p-3 text-center">
        <h2 className="text-xl font-bold text-gray-800">{props.author}</h2>
        <p className="text-sm text-gray-500 mb-2">id: {props.id}</p>

        {/* Button */}
        <button className="bg-amber-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-amber-600 transition duration-300">
          View Profile
        </button>
      </div>
    </div>
  );
}

export default Card;
