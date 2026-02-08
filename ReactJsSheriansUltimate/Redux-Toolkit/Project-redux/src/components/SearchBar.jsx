import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../store/features/searchSlice";
import { store } from "../store/store";

const SearchBar = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setQuery(text));
    setText("");
  };
  
  const {query} = useSelector((store) => store.search)

  return (
    
    <form
      onSubmit={submitHandler}
      className="flex w-full max-w-3xl mb-6 bg-gray-800 rounded-xl overflow-hidden shadow-lg"
    >
        {/* let's do twoway binding*/}

{/* u want to directly conenct with your website but you cant in react it tells you ke first tell react
then react does it for us */}

      <input
        type="text"
        value={text}
        onChange={(e) =>{ setText(e.target.value)
            dispatch(setQuery(''))
    
            dispatch(setQuery(text))
            console.log("The query as of now is: ",query);
          }
            

        }
        placeholder="Search photos or videos..."
        required
        className="flex-1 px-4 py-3 text-lg bg-gray-800 text-white placeholder-gray-400 outline-none"
      />
      <button
        type="submit"
        className="bg-emerald-500 px-6 py-3 font-semibold hover:bg-emerald-600 transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
