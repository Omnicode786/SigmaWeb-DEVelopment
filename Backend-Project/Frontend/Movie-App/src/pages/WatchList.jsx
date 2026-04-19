import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, Notebook, Film, Clock, Loader2 } from 'lucide-react'
import { LineGraph } from '../components/LineChart';
import BarChart from '../components/BarChart';
const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:5001/watchlist', {
          headers: {
            // This allows req.user to be populated in the backend
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.status === "success") {
          console.log(response.data.data)
          setWatchlist(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching watchlist:", err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWatchlist();
  }, []);

  const getAllStatus = () => {
    const labels = [
      "COMPLETED",
      "DROPPED",
      "PLANNED",
      "WATCHING"
    ];

    const statusCounts = watchlist.reduce((accumulator, item) => {
      status = item.status.trim();
      accumulator[status] += 1;
      return accumulator;

    }, {"PLANNED": 0, "WATCHING": 0, "COMPLETED": 0, "DROPPED": 0});
console.log(statusCounts)
      return statusCounts;
  }
  const datavalue = getAllStatus();
  

  if (loading) return <div className="min-h-screen bg-[#181f0b] p-10">
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex items-center gap-3 text-neutral-300">
        <Loader2 className="animate-spin" size={18} />
        <span className="text-sm font-semibold">Loading WatchList...</span>
      </div>
    </div>

  </div>;

  return (
    <div className=' min-h-screen bg-[#181f0b] p-10'>
      <div className="mt-10  text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {watchlist.map((item) => (
          <div
            key={item.id}
            className="group relative bg-[#0f0f0f] border border-white/5 hover:border-blue-500/50 rounded-3xl p-6 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] overflow-hidden"
          >
            {/* Subtle Background Glow on Hover */}
            <div className="absolute -inset-px bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col h-full">
              {/* Top Row: Title & Status */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white tracking-tight leading-tight group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${item.status === 'Completed'
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                    : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                  }`}>
                  {item.status}
                </span>
              </div>

              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(10)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < item.rating ? "fill-blue-500 text-blue-500" : "text-neutral-700"}
                  />
                ))}
                <span className="ml-2 text-xs font-medium text-neutral-500">{item.rating}/10</span>
              </div>

              {/* Notes Section (Bento Style) */}
              {item.notes && (
                <div className="bg-white/5 rounded-2xl p-3 mb-6 border border-white/5 italic text-sm text-neutral-400 flex gap-2">
                  <Notebook size={14} className="shrink-0 mt-1 text-blue-500/50" />
                  <p className="line-clamp-2">"{item.notes}"</p>
                </div>
              )}

              {/* Bottom Row: Metadata */}
              <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500 font-medium uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <Clock size={12} />
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Film size={12} />
                  <span>Movie</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
      
      </div>
    </div>

  );
};

export default Watchlist;