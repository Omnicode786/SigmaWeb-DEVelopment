import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTabs } from "../store/features/searchSlice";

const Tabs = () => {
  const tabs = ["Photos", "Videos"];
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.search.activeTab);

  return (
    <div className="flex gap-4 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => dispatch(setActiveTabs(tab))}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300
            ${
              activeTab === tab
                ? "bg-emerald-500 text-gray-900 shadow-lg"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
