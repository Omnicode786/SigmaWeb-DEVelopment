import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import {
  Bookmark,
  BookmarkCheck,
  Calendar,
  CheckCircle2,
  Clock,
  Loader2,
  Search,
  Sparkles,
  Star,
  X,
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:5001';
const WATCHLIST_ENDPOINT = `${API_BASE_URL}/watchlist`;

const STATUS_OPTIONS = [
  { value: 'PLANNED', label: 'Planned' },
  { value: 'WATCHING', label: 'Watching' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'ON_HOLD', label: 'On Hold' },
  { value: 'DROPPED', label: 'Dropped' },
];

const getPosterUrl = (movie) => {
  const possible =
    movie?.posterUrl ||
    movie?.posterURL ||
    movie?.poster ||
    movie?.poster_path ||
    movie?.image ||
    movie?.imageUrl ||
    movie?.thumbnail ||
    null;

  if (!possible) return null;

  if (possible.startsWith('http://') || possible.startsWith('https://')) {
    return possible;
  }

  if (possible.startsWith('/')) {
    return `${API_BASE_URL}${possible}`;
  }

  return possible;
};

const getMovieYear = (movie) => {
  if (movie?.releaseYear) return movie.releaseYear;

  if (movie?.releaseDate) {
    const year = new Date(movie.releaseDate).getFullYear();
    return Number.isNaN(year) ? 'N/A' : year;
  }

  return 'N/A';
};

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    status: 'PLANNED',
    rating: '',
    notes: '',
  });

  const [loadingMovies, setLoadingMovies] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submittingMovieId, setSubmittingMovieId] = useState(null);

  const [addedMovieIds, setAddedMovieIds] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGenre, setActiveGenre] = useState('ALL');

  const [toast, setToast] = useState({
    show: false,
    type: 'success',
    message: '',
  });

  const containerRef = useRef(null);
  const modalRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, type, message });

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 2800);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoadingMovies(true);
        const response = await axios.get(`${API_BASE_URL}/movies`);
        setMovies(response?.data?.data || []);
      } catch (err) {
        console.error('Fetch error:', err);
        showToast('Failed to load movies', 'error');
      } finally {
        setLoadingMovies(false);
      }
    };

    fetchMovies();

    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!movies.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        '.movie-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: 'power3.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [movies]);

  useEffect(() => {
    if (!isModalOpen || !modalRef.current) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    gsap.fromTo(
      modalRef.current,
      { y: 24, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.28, ease: 'power3.out' }
    );

    const handleEscape = (e) => {
      if (e.key === 'Escape') closeWatchListModal();
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen, submitting]);

  const genres = useMemo(() => {
    const extracted = movies.flatMap((movie) =>
      Array.isArray(movie?.genres) ? movie.genres : []
    );

    return ['ALL', ...new Set(extracted)];
  }, [movies]);

  const filteredMovies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return movies.filter((movie) => {
      const title = movie?.title?.toLowerCase() || '';
      const overview = movie?.overview?.toLowerCase() || '';
      const creator = movie?.createdBy?.toLowerCase() || '';
      const genresText = Array.isArray(movie?.genres)
        ? movie.genres.join(' ').toLowerCase()
        : '';

      const matchesQuery =
        !query ||
        title.includes(query) ||
        overview.includes(query) ||
        creator.includes(query) ||
        genresText.includes(query);

      const matchesGenre =
        activeGenre === 'ALL' ||
        (Array.isArray(movie?.genres) && movie.genres.includes(activeGenre));

      return matchesQuery && matchesGenre;
    });
  }, [movies, searchQuery, activeGenre]);

  const openWatchListModal = (movie) => {
    setSelectedMovie(movie);
    setForm({
      status: 'PLANNED',
      rating: '',
      notes: '',
    });
    setIsModalOpen(true);
  };

  const closeWatchListModal = () => {
    if (submitting) return;
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeWatchListModal();
    }
  };

  const handleFormChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submitWatchList = async () => {
    if (!selectedMovie) return;

    try {
      setSubmitting(true);
      setSubmittingMovieId(selectedMovie.id);

      const token = localStorage.getItem('token');

      const payload = {
        movieId: selectedMovie.id,
        status: form.status,
        rating: form.rating === '' ? null : Number(form.rating),
        notes: form.notes.trim(),
      };

      await axios.post(WATCHLIST_ENDPOINT, payload, {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      });

      setAddedMovieIds((prev) => new Set([...prev, selectedMovie.id]));
      showToast(`${selectedMovie.title} added to your watch list`);
      closeWatchListModal();
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error || 'Failed to add movie to watch list';

      if (
        errorMessage.toLowerCase().includes('already in the watch list') &&
        selectedMovie?.id
      ) {
        setAddedMovieIds((prev) => new Set([...prev, selectedMovie.id]));
      }

      console.error('Watch list error:', errorMessage);
      showToast(errorMessage, 'error');
    } finally {
      setSubmitting(false);
      setSubmittingMovieId(null);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#070b16] text-white">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[-10%] top-[-8%] h-[340px] w-[340px] rounded-full bg-cyan-500/14 blur-3xl" />
          <div className="absolute right-[-10%] top-[8%] h-[320px] w-[320px] rounded-full bg-fuchsia-500/12 blur-3xl" />
          <div className="absolute bottom-[-10%] left-[18%] h-[300px] w-[300px] rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" ref={containerRef}>
          <div className="hero-item relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_20px_70px_-35px_rgba(59,130,246,0.35)] backdrop-blur-xl sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(217,70,239,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.10),transparent_30%)]" />
            <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                  <Sparkles size={14} />
                  Collection
                </div>

                <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Browse Movies
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                  Discover titles, save what you want to watch, and keep your own
                  ratings and notes in one place.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="hero-item rounded-2xl border border-white/10 bg-black/20 px-4 py-4 backdrop-blur-md">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Library
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">{movies.length}</p>
                </div>

                <div className="hero-item rounded-2xl border border-white/10 bg-black/20 px-4 py-4 backdrop-blur-md">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Results
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">
                    {filteredMovies.length}
                  </p>
                </div>

                <div className="hero-item rounded-2xl border border-white/10 bg-black/20 px-4 py-4 backdrop-blur-md col-span-2 sm:col-span-1">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Saved
                  </p>
                  <p className="mt-2 text-2xl font-black text-white">
                    {addedMovieIds.size}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-item mt-6 rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-lg">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-md">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies, genres, creators..."
                  className="w-full rounded-2xl border border-white/10 bg-[#0c1324] py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-500/10"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {genres.slice(0, 8).map((genre, index) => {
                  const isActive = activeGenre === genre;

                  const chipStyles = [
                    'hover:border-cyan-400/40 hover:text-cyan-300',
                    'hover:border-fuchsia-400/40 hover:text-fuchsia-300',
                    'hover:border-emerald-400/40 hover:text-emerald-300',
                    'hover:border-violet-400/40 hover:text-violet-300',
                  ];

                  const hoverStyle = chipStyles[index % chipStyles.length];

                  return (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => setActiveGenre(genre)}
                      className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                        isActive
                          ? 'border border-cyan-400/30 bg-cyan-400/12 text-cyan-300'
                          : `border border-white/10 bg-white/[0.04] text-slate-300 ${hoverStyle}`
                      }`}
                    >
                      {genre === 'ALL' ? 'All' : genre}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8">
            {loadingMovies ? (
              <div className="flex min-h-[50vh] items-center justify-center">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-slate-200 backdrop-blur-md">
                  <Loader2 className="animate-spin" size={18} />
                  <span className="text-sm font-semibold">Loading movies...</span>
                </div>
              </div>
            ) : filteredMovies.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.04] px-6 py-16 text-center backdrop-blur-md">
                <h3 className="text-xl font-bold text-white">No movies found</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Try another search or genre.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredMovies.map((movie, index) => {
                  const isAdded = addedMovieIds.has(movie.id);
                  const isBusy = submittingMovieId === movie.id;
                  const posterUrl = getPosterUrl(movie);

                  const fallbackGradients = [
                    'from-cyan-500/25 via-blue-500/10 to-transparent',
                    'from-fuchsia-500/25 via-pink-500/10 to-transparent',
                    'from-emerald-500/25 via-teal-500/10 to-transparent',
                    'from-violet-500/25 via-indigo-500/10 to-transparent',
                  ];

                  const fallbackGradient = fallbackGradients[index % fallbackGradients.length];

                  return (
                    <div
                      key={movie.id}
                      className="movie-card group overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1220]/95 shadow-[0_18px_55px_-34px_rgba(15,23,42,0.9)] transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-400/20 hover:shadow-[0_24px_70px_-35px_rgba(34,211,238,0.28)]"
                    >
                      <div className="relative h-64 overflow-hidden">
                        {posterUrl ? (
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${posterUrl})` }}
                          />
                        ) : (
                          <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient}`} />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-[#0b1220]/40 to-transparent" />
                        <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient}`} />

                        <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-3">
                          <div className="flex flex-wrap gap-2">
                            {movie.genres?.slice(0, 2).map((genre, i) => (
                              <span
                                key={i}
                                className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[11px] font-bold text-slate-100 backdrop-blur-md"
                              >
                                {genre}
                              </span>
                            ))}
                          </div>

                          {isAdded && (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/12 backdrop-blur-md">
                              <CheckCircle2 size={17} className="text-emerald-300" />
                            </div>
                          )}
                        </div>

                        <div className="absolute bottom-5 left-5 right-5">
                          <div className="mb-3 flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[11px] font-semibold text-slate-100 backdrop-blur-sm">
                              <Calendar size={12} />
                              {getMovieYear(movie)}
                            </span>

                            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[11px] font-semibold text-slate-100 backdrop-blur-sm">
                              <Clock size={12} />
                              {movie.runtime ? `${movie.runtime} min` : 'N/A'}
                            </span>
                          </div>

                          <h3 className="line-clamp-2 text-2xl font-black tracking-tight text-white">
                            {movie.title}
                          </h3>
                        </div>
                      </div>

                      <div className="p-6">
                        <p className="min-h-[48px] line-clamp-2 text-sm leading-6 text-slate-400">
                          {movie.overview ||
                            'A cinematic masterpiece curated for your collection.'}
                        </p>

                        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                              Added By
                            </span>
                            <p className="truncate text-sm font-semibold text-slate-200">
                              @{movie.createdBy?.split(' ')[0] || 'system'}
                            </p>
                          </div>

                          <button
                            onClick={() => openWatchListModal(movie)}
                            disabled={isAdded || isBusy}
                            className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-300 ${
                              isAdded
                                ? 'cursor-default border border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
                                : 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:from-cyan-400 hover:to-fuchsia-500 shadow-[0_12px_24px_-12px_rgba(56,189,248,0.45)]'
                            }`}
                          >
                            {isBusy ? (
                              <>
                                <Loader2 size={16} className="animate-spin" />
                                Saving
                              </>
                            ) : isAdded ? (
                              <>
                                <BookmarkCheck size={16} />
                                Added
                              </>
                            ) : (
                              <>
                                <Bookmark size={16} />
                                Add to List
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {isModalOpen && selectedMovie && (
            <div
              onClick={handleBackdropClick}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-md"
            >
              <div
                ref={modalRef}
                className="w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1220]/95 shadow-[0_30px_90px_-35px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
              >
                <div className="relative border-b border-white/10 p-6 sm:p-7">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_35%),radial-gradient(circle_at_top_right,rgba(217,70,239,0.10),transparent_32%)]" />
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="mb-2 text-[11px] font-black uppercase tracking-[0.25em] text-cyan-300">
                        Watch List
                      </p>
                      <h2 className="text-2xl font-black leading-tight text-white sm:text-3xl">
                        {selectedMovie.title}
                      </h2>
                      <p className="mt-2 text-sm text-slate-400">
                        Save your status, rating, and personal notes.
                      </p>
                    </div>

                    <button
                      onClick={closeWatchListModal}
                      disabled={submitting}
                      className="rounded-xl border border-white/10 bg-white/[0.05] p-2 text-slate-200 transition hover:bg-white/[0.09]"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                <div className="space-y-6 p-6 sm:p-7">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-200">
                      Status
                    </label>
                    <select
                      value={form.status}
                      onChange={(e) => handleFormChange('status', e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-white outline-none transition focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-500/10"
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          className="bg-[#0f172a] text-white"
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-200">
                      Rating
                    </label>

                    <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                        const active = Number(form.rating) === num;

                        return (
                          <button
                            type="button"
                            key={num}
                            onClick={() => handleFormChange('rating', num)}
                            className={`h-11 rounded-xl border text-sm font-bold transition ${
                              active
                                ? 'border-amber-400/30 bg-amber-400/12 text-amber-300'
                                : 'border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.07]'
                            }`}
                          >
                            <span className="inline-flex items-center gap-1">
                              <Star size={13} className={active ? 'fill-amber-400' : ''} />
                              {num}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleFormChange('rating', '')}
                      className="mt-3 text-xs font-semibold text-slate-500 transition hover:text-slate-300"
                    >
                      Clear rating
                    </button>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-200">
                      Notes
                    </label>
                    <textarea
                      rows={4}
                      value={form.notes}
                      onChange={(e) => handleFormChange('notes', e.target.value)}
                      placeholder="Add your thoughts, reminders, or why you saved this movie..."
                      className="w-full resize-none rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-500/10"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-white/10 p-6 sm:p-7">
                  <button
                    type="button"
                    onClick={closeWatchListModal}
                    disabled={submitting}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 font-semibold text-slate-200 transition hover:bg-white/[0.08]"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={submitWatchList}
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-3 font-black text-white transition hover:from-cyan-400 hover:to-fuchsia-500 disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Bookmark size={16} />
                        Save to Watch List
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {toast.show && (
            <div
              className={`fixed right-5 top-5 z-[60] rounded-2xl border px-4 py-3 text-sm font-semibold shadow-xl backdrop-blur-xl transition ${
                toast.type === 'error'
                  ? 'border-red-400/20 bg-red-500/10 text-red-200'
                  : 'border-emerald-400/20 bg-emerald-500/10 text-emerald-200'
              }`}
            >
              {toast.message}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Movies;