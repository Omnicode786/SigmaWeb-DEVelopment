import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5001";

const CHART_COLORS = [
  "rgb(255, 21, 4)",
  "rgb(208, 39, 246)",
  "rgb(4, 117, 255)",
  "rgb(4, 255, 142)",
  "rgb(255, 209, 4)",
  "rgb(99, 102, 241)",
];

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const extractArray = (response) => {
  const payload = response?.data;

  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.movies)) return payload.movies;
  if (Array.isArray(payload?.watchlist)) return payload.watchlist;
  if (Array.isArray(payload)) return payload;

  return [];
};

export const fetchMovies = async () => {
  const response = await api.get("/movies");
  return extractArray(response);
};

export const fetchWatchlist = async () => {
  const response = await api.get("/watchlist");
  return extractArray(response);
};

const normalizeStatus = (status = "") => {
  return status.toString().trim().toUpperCase();
};

const getStatusCounts = (watchlist) => {
  const counts = {
    PLANNED: 0,
    WATCHING: 0,
    COMPLETED: 0,
    DROPPED: 0,
  };

  watchlist.forEach((item) => {
    const status = normalizeStatus(item.status);
    if (counts[status] !== undefined) {
      counts[status] += 1;
    }
  });

  return counts;
};

const buildStatusBarData = (watchlist) => {
  const counts = getStatusCounts(watchlist);

  return {
    labels: Object.keys(counts),
    datasets: [
      {
        label: "Movies",
        data: Object.values(counts),
        backgroundColor: CHART_COLORS.slice(0, 4),
        borderColor: "purple",
        borderWidth: 1.2,
        borderRadius: 10,
      },
    ],
  };
};

const getLast7Dates = () => {
  const labels = [];
  const keys = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    labels.push(
      date.toLocaleDateString("en-US", {
        weekday: "short",
      })
    );

    keys.push(date.toISOString().slice(0, 10));
  }

  return { labels, keys };
};

const buildWeeklyLineData = (watchlist) => {
  const { labels, keys } = getLast7Dates();
  const dailyCounts = Object.fromEntries(keys.map((key) => [key, 0]));

  watchlist.forEach((item) => {
    const rawDate = item.createdAt || item.updatedAt;
    if (!rawDate) return;

    const itemDate = new Date(rawDate);
    if (Number.isNaN(itemDate.getTime())) return;

    const key = itemDate.toISOString().slice(0, 10);
    if (dailyCounts[key] !== undefined) {
      dailyCounts[key] += 1;
    }
  });

  return {
    labels,
    datasets: [
      {
        label: "Added to Watchlist",
        data: keys.map((key) => dailyCounts[key]),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.35,
      },
    ],
  };
};

const extractGenre = (movie) => {
  if (typeof movie?.genre === "string" && movie.genre.trim()) {
    return movie.genre.split(",")[0].trim();
  }

  if (Array.isArray(movie?.genres) && movie.genres.length > 0) {
    const firstGenre = movie.genres[0];
    if (typeof firstGenre === "string") return firstGenre;
    if (typeof firstGenre?.name === "string") return firstGenre.name;
  }

  if (typeof movie?.category === "string" && movie.category.trim()) {
    return movie.category.trim();
  }

  if (typeof movie?.movie?.genre === "string" && movie.movie.genre.trim()) {
    return movie.movie.genre.split(",")[0].trim();
  }

  return "Unknown";
};

const buildGenrePieData = (movies, watchlist) => {
  const source = movies.length ? movies : watchlist;
  const genreCounts = {};

  source.forEach((item) => {
    const genre = extractGenre(item);
    genreCounts[genre] = (genreCounts[genre] || 0) + 1;
  });

  const topGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  if (!topGenres.length) {
    return {
      labels: ["No Data"],
      datasets: [
        {
          label: "Genres",
          data: [1],
          backgroundColor: ["rgb(148, 163, 184)"],
        },
      ],
    };
  }

  return {
    labels: topGenres.map(([genre]) => genre),
    datasets: [
      {
        label: "Movies by Genre",
        data: topGenres.map(([, count]) => count),
        backgroundColor: CHART_COLORS.slice(0, topGenres.length),
        hoverOffset: 16,
      },
    ],
  };
};

const buildStats = (movies, watchlist) => {
  const statusCounts = getStatusCounts(watchlist);

  const ratings = watchlist
    .map((item) => Number(item.rating))
    .filter((rating) => !Number.isNaN(rating));

  const averageRating = ratings.length
    ? (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1)
    : "0.0";

  return {
    totalMovies: movies.length,
    totalWatchlist: watchlist.length,
    completedMovies: statusCounts.COMPLETED,
    averageRating,
  };
};

const buildRecentWatchlist = (watchlist) => {
  return [...watchlist]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 5);
};

export const useDashboardData = () => {
  const [dashboard, setDashboard] = useState({
    loading: true,
    error: "",
    movies: [],
    watchlist: [],
    stats: {
      totalMovies: 0,
      totalWatchlist: 0,
      completedMovies: 0,
      averageRating: "0.0",
    },
    barChartData: {
      labels: [],
      datasets: [],
    },
    lineChartData: {
      labels: [],
      datasets: [],
    },
    pieChartData: {
      labels: [],
      datasets: [],
    },
    recentWatchlist: [],
  });

  const loadDashboard = async () => {
    try {
      setDashboard((prev) => ({
        ...prev,
        loading: true,
        error: "",
      }));

      const [movies, watchlist] = await Promise.all([
        fetchMovies(),
        fetchWatchlist(),
      ]);

      setDashboard({
        loading: false,
        error: "",
        movies,
        watchlist,
        stats: buildStats(movies, watchlist),
        barChartData: buildStatusBarData(watchlist),
        lineChartData: buildWeeklyLineData(watchlist),
        pieChartData: buildGenrePieData(movies, watchlist),
        recentWatchlist: buildRecentWatchlist(watchlist),
      });
    } catch (error) {
      setDashboard((prev) => ({
        ...prev,
        loading: false,
        error:
          error.response?.data?.error ||
          error.message ||
          "Failed to load dashboard data",
      }));
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return {
    ...dashboard,
    refetch: loadDashboard,
  };
};