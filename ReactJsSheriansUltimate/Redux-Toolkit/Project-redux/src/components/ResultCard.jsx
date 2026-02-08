import { useDispatch, useSelector } from "react-redux";
import {
  addToCollection,
  removeFromCollection,
  ToastOnAdd,
  ToastOnRemove
} from "../store/features/collectionSlice";
import { useEffect } from "react";

const ResultCard = ({ ...item }) => {
  const dispatch = useDispatch();
  const { activeTab } = useSelector((store) => store.search);
  const collection = useSelector((store) => store.collection.items);

  const isSaved = collection.some((c) => c.id === item.id);

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-md hover:scale-105 transition-all">
      <a href={item.ogUrl} target="_blank">
        {item.type === "photo" ? (
          <img src={item.url} className="w-full h-56 object-cover" />
        ) : (
          <video
            src={item.url}
            poster={item.thumbnail}
            controls
            className="w-full h-56 object-cover"
          />
        )}
      </a>

      <div className="p-3 flex justify-around items-center">
        <h3 className="text-sm truncate">{item.title}</h3>

        <button
          onClick={() =>{
            if(isSaved){
               dispatch(removeFromCollection(item));
               dispatch(ToastOnRemove());

            }
            else{
               dispatch(addToCollection(item));
               dispatch(ToastOnAdd());

            }

          }
          }
          className={`rounded-2xl py-2 px-4 text-white font-semibold active:scale-90 ${
            isSaved ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {isSaved ? "Remove" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
