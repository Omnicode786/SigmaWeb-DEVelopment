import React from "react";
import {
  Film,
  ListVideo,
  CheckCircle2,
  Star,
  Loader2,
  RefreshCcw,
} from "lucide-react";

import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import { useDashboardData } from "../data/data";

const StatCard = ({ title, value, helper, icon: Icon }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#101710] p-5 shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm uppercase tracking-widest text-neutral-400">
            {title}
          </p>
          <h3 className="mt-3 text-3xl font-bold text-white">{value}</h3>
          <p className="mt-2 text-sm text-neutral-400">{helper}</p>
        </div>

        <div className="rounded-2xl bg-white/5 p-3">
          <Icon className="text-blue-400" size={22} />
        </div>
      </div>
    </div>
  );
};

const getStatusBadgeClasses = (status = "") => {
  const value = status.toUpperCase();

  if (value === "COMPLETED") {
    return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
  }

  if (value === "WATCHING") {
    return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
  }

  if (value === "DROPPED") {
    return "bg-red-500/10 text-red-400 border border-red-500/20";
  }

  return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
};

const HomePage = () => {
  const {
    loading,
    error,
    stats,
    barChartData,
    lineChartData,
    pieChartData,
    recentWatchlist,
    refetch,
  } = useDashboardData();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#181f0b] p-10">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex items-center gap-3 text-neutral-300">
            <Loader2 className="animate-spin" size={18} />
            <span className="text-sm font-semibold">Loading dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181f0b] p-6 text-white md:p-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
            Dashboard
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">
            Movie App Home
          </h1>
          <p className="mt-2 text-neutral-400">
            Overview of movies, watchlist activity, and genre distribution.
          </p>
        </div>

        <button
          onClick={refetch}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold transition hover:bg-white/10"
        >
          <RefreshCcw size={16} />
          Refresh Data
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Movies"
          value={stats.totalMovies}
          helper="All movies fetched from your movies API"
          icon={Film}
        />

        <StatCard
          title="Watchlist Items"
          value={stats.totalWatchlist}
          helper="All movies saved in user watchlist"
          icon={ListVideo}
        />

        <StatCard
          title="Completed"
          value={stats.completedMovies}
          helper="Movies marked as completed"
          icon={CheckCircle2}
        />

        <StatCard
          title="Average Rating"
          value={stats.averageRating}
          helper="Average rating from watchlist items"
          icon={Star}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-[#101710] p-5">
          <LineChart
            chartData={lineChartData}
            title="Watchlist Activity - Last 7 Days"
          />
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#101710] p-5">
          <BarChart
            chartData={barChartData}
            title="Watchlist Status Overview"
          />
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#101710] p-5">
          <PieChart chartData={pieChartData} title="Top Genres" />
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#101710] p-5">
          <h2 className="text-xl font-bold">Recently Added</h2>
          <p className="mt-1 text-sm text-neutral-400">
            Latest items from the watchlist
          </p>

          <div className="mt-5 space-y-3">
            {recentWatchlist.length > 0 ? (
              recentWatchlist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4"
                >
                  <div>
                    <p className="font-semibold text-white">
                      {item.title || item.movie?.title || "Untitled Movie"}
                    </p>
                    <p className="mt-1 text-sm text-neutral-400">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "No date"}{" "}
                      • Rating: {item.rating ?? "N/A"}/10
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${getStatusBadgeClasses(
                      item.status || "PLANNED"
                    )}`}
                  >
                    {item.status || "PLANNED"}
                  </span>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-neutral-400">
                No watchlist items found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;