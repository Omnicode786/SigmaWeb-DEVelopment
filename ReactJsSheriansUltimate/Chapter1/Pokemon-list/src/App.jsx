import { useState, useEffect } from "react";
import "./App.css";
import PokeCard from "./components/PokeCard";
import Navbar from "./components/Navbar";
import axios from "axios";

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  const getData = async (id) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.data;
  };

  useEffect(() => {
    const fetchAll = async () => {
      const promises = Array.from({ length: 1025 }, (_, i) => getData(i + 1)); // IDs 1 to 50
      const results = await Promise.all(promises);
      setPokemonList(results);
    };

    fetchAll();
  }, []);

  return (
    <>
      <div className="flex justify-center pt-8">
        <Navbar />
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => {
            const fetchAll = async () => {
              const promises = Array.from({ length: 50 }, (_, i) => getData(i + 1));
              const results = await Promise.all(promises);
              setPokemonList(results);
            };
            fetchAll();
          }}
          className="bg-amber-600 p-3 rounded"
        >
          Get Data
        </button>
      </div>

      <div className="flex justify-center mt-10 flex-wrap gap-6">
        {pokemonList.map((pokemon) => (
          <PokeCard key={pokemon.id} data={pokemon} />
        ))}
      </div>
    </>
  );
}

export default App;
