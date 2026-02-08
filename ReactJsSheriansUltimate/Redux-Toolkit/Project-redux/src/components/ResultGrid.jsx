import React, { useEffect } from "react";
import { fetchPhotos, fetchVideos } from "../api/mediaApi";
import {
  setActiveTabs,
  setError,
  setLoading,
  setQuery,
  setResults,
} from "../store/features/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../store/store";
import ResultCard from './ResultCard';

const ResultGrid = () => {
  const { query, activeTab, loading, error, results } = useSelector(
    (store) => store.search,
  );
  const dispatch = useDispatch();
  // console.log(activeTab);

  useEffect(() => {
    const getData = async (query) => {
      try {
        dispatch(setLoading());
        let data = [];
        if (activeTab === "Photos") {
          data = await fetchPhotos(query);
          // console.log("the data is: ",data)
          // console.log("will this be shown")
        } else {
          // console.log("will this be shown for videos")

          data = await fetchVideos(query);
          // console.log("the data is: ",data)
        }
        dispatch(setResults(data));
      } catch (err) {
        dispatch(setResults([]));

    dispatch(setError(err.message || "Failed to fetch"))
      }
    };

    getData(query);
  }, [query, activeTab]);

  useEffect(() => {
    // console.log("Results updated:", results);
  }, [results]);
 if (loading)
    return <h1 className="text-xl font-semibold text-center mt-10">Loading...</h1>;
  if (error)
    return (
      <h1 className="text-xl font-semibold text-center mt-10 text-red-500">
        Error: {error}
      </h1>
    );
  if (!results.length)
    return (
      <h1 className="text-xl font-semibold text-center mt-10">
        No results found
      </h1>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {results.map((item, idx) => (
       <ResultCard key={idx} {...item}/>
      ))}
    </div>
  );
};

export default ResultGrid;
