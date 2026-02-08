import { useDispatch, useSelector } from "react-redux";
import { store } from "../store/store";
import ResultCard from "../components/ResultCard";
import { div } from "framer-motion/client";
import { clearCollection } from "../store/features/collectionSlice";
import { useEffect } from "react";

const CollectionPage = () => {
  const dispatch = useDispatch()
  useEffect(()=> {

  },[dispatch])
  const collection = useSelector((store) => store.collection.items);
  if (!collection.length)
    return <h1 className="text-center mt-10">No items saved</h1>;

  return (
    <div>

      <button
      onClick={() => {
        dispatch(clearCollection())
      }}
      className="bg-red-500 text-white px-4 py-2 text-lg rounded mb-6 active:scale-95 font-semibold">Clear Collection</button>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {collection.map((item) => (
        <ResultCard key={item.id} {...item} />
      ))}
    </div>
    </div>
  );
};
export default CollectionPage;
