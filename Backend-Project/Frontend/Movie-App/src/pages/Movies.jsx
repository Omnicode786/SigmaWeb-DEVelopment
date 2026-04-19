import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import {
  BookmarkCheck,
  Bookmark,
  Calendar,
  CheckCircle2,
  Clock,
  Loader2,
  Star,
  X,
} from 'lucide-react';
import { LineChart } from 'lucide-react';
const API_BASE_URL = 'http://localhost:5001';
const WATCHLIST_ENDPOINT = `${API_BASE_URL}/watchlist`; // change if your route is different

const STATUS_OPTIONS = [
  { value: 'PLANNED', label: 'Planned' },
  { value: 'WATCHING', label: 'Watching' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'ON_HOLD', label: 'On Hold' },
  { value: 'DROPPED', label: 'Dropped' },
];

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
  const [toast, setToast] = useState({
    show: false,
    type: 'success',
    message: '',
  });

  const containerRef = useRef(null);
  const modalRef = useRef(null);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, type, message });

    setTimeout(() => {
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
  }, []);

  useEffect(() => {
    if (!movies.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.movie-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [movies]);

  useEffect(() => {
    if (!isModalOpen || !modalRef.current) return;

    gsap.fromTo(
      modalRef.current,
      { y: 30, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.28, ease: 'power3.out' }
    );
  }, [isModalOpen]);

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

      // if backend says it's already there, reflect that in UI too
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
<div className=' min-h-screen bg-[#181f0b] p-10'>
   <div ref={containerRef} className="p-6">
        {loadingMovies ? (
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="flex items-center gap-3 text-neutral-300">
              <Loader2 className="animate-spin" size={18} />
              <span className="text-sm font-semibold">Loading movies...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           {movies.map((movie) => {
  const isAdded = addedMovieIds.has(movie.id);
  const isBusy = submittingMovieId === movie.id;

  return (
    <div
      key={movie.id}
      className="group relative bg-[#0a0a0a] border border-white/[0.05] rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:border-blue-500/40 hover:shadow-[0_0_80px_-20px_rgba(59,130,246,0.3)] hover:-translate-y-2"
    >
    
      {/* Visual Header / Poster Area */}
      <div className="h-56 relative flex items-center justify-center overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)] group-hover:scale-150 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
        
        {/* Dynamic Abstract Lettering */}
        <span className="text-white/[0.03] text-9xl font-black italic tracking-tighter select-none group-hover:text-blue-500/[0.08] transition-all duration-700 group-hover:scale-110">
          {movie.title?.slice(0, 1) || 'M'}
        </span>

        {/* Top Badges */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
          <div className="flex gap-2">
            {movie.genres?.slice(0, 1).map((genre, i) => (
              <span
                key={i}
                className="px-4 py-1.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.15em] text-blue-400 shadow-2xl"
              >
                {genre}
              </span>
            ))}
          </div>
          {isAdded && (
            <div className="bg-emerald-500/20 backdrop-blur-md p-2 rounded-full border border-emerald-500/30 animate-in zoom-in duration-300">
              <CheckCircle2 size={16} className="text-emerald-400" />
            </div>
          )}
        </div>

        {/* Bottom Fade Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>

      {/* Content Section */}
      <div className="px-8 pb-8 pt-2">
        {/* Metadata Grid */}
        <div className="flex items-center gap-4 mb-5">
          <div className="flex items-center gap-2 text-neutral-500 bg-white/[0.03] px-3 py-1.5 rounded-2xl border border-white/[0.05]">
            <Calendar size={13} className="text-blue-500/70" />
            <span className="text-[11px] font-black tracking-wider">{movie.releaseYear || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-500 bg-white/[0.03] px-3 py-1.5 rounded-2xl border border-white/[0.05]">
            <Clock size={13} className="text-purple-500/70" />
            <span className="text-[11px] font-black tracking-wider">
              {movie.runtime ? `${movie.runtime}M` : 'N/A'}
            </span>
          </div>
        </div>

        {/* Typography */}
        <h3 className="text-2xl font-black text-white mb-3 tracking-tighter group-hover:text-blue-400 transition-colors duration-300 line-clamp-1 uppercase">
          {movie.title}
        </h3>

        <p className="text-neutral-500 text-sm line-clamp-2 mb-8 leading-relaxed font-medium min-h-[40px] group-hover:text-neutral-400 transition-colors">
          {movie.overview || 'A cinematic masterpiece curated for your private collection.'}
        </p>

        {/* Interactive Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-white/[0.05]">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] text-neutral-600 font-black uppercase tracking-[0.25em]">Registry</span>
            <span className="text-[11px] text-neutral-400 font-bold truncate max-w-[110px] lowercase opacity-70">
              @{movie.createdBy?.split(' ')[0] || 'system'}
            </span>
          </div>

          <button
            onClick={() => openWatchListModal(movie)}
            disabled={isAdded || isBusy}
            className={`relative group/btn flex items-center justify-center gap-3 text-[11px] font-black tracking-widest px-6 py-4 rounded-2xl transition-all duration-500 active:scale-90 overflow-hidden ${
              isAdded
                ? 'bg-transparent text-emerald-400 border border-emerald-500/20 cursor-default'
                : 'bg-blue-600 hover:bg-white text-white hover:text-black shadow-[0_10px_20px_-10px_rgba(59,130,246,0.5)]'
            }`}
          >
            {/* Shimmer Effect */}
            {!isAdded && !isBusy && (
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
            )}

            {isBusy ? (
              <Loader2 size={15} className="animate-spin" />
            ) : isAdded ? (
              <BookmarkCheck size={15} className="fill-emerald-400" />
            ) : (
              <Bookmark size={15} className="group-hover/btn:scale-110 transition-transform" />
            )}

            <span className="relative z-10">{isAdded ? 'COLLECTED' : 'ADD TO LIST'}</span>
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
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            ref={modalRef}
            className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-neutral-950/95 shadow-2xl overflow-hidden"
          >
            <div className="flex items-start justify-between p-6 border-b border-white/10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-blue-400 font-black mb-2">
                  Add to Watch List
                </p>
                <h2 className="text-2xl font-bold text-white leading-tight">
                  {selectedMovie.title}
                </h2>
                <p className="text-sm text-neutral-400 mt-2">
                  Save your viewing status, rating, and personal notes.
                </p>
              </div>

              <button
                onClick={closeWatchListModal}
                disabled={submitting}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-200 mb-2">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) => handleFormChange('status', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-neutral-900 text-white"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-200 mb-2">
                  Rating
                </label>

                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                    const active = Number(form.rating) === num;

                    return (
                      <button
                        type="button"
                        key={num}
                        onClick={() => handleFormChange('rating', num)}
                        className={`h-11 rounded-xl border text-sm font-bold transition ${
                          active
                            ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/40'
                            : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <span className="inline-flex items-center gap-1">
                          <Star size={13} className={active ? 'fill-yellow-300' : ''} />
                          {num}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => handleFormChange('rating', '')}
                  className="mt-3 text-xs font-semibold text-neutral-400 hover:text-white transition"
                >
                  Clear rating
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-200 mb-2">
                  Notes
                </label>
                <textarea
                  rows={4}
                  value={form.notes}
                  onChange={(e) => handleFormChange('notes', e.target.value)}
                  placeholder="Add your thoughts, reminders, or why you saved this movie..."
                  className="w-full resize-none bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 rounded-2xl px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="p-6 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={closeWatchListModal}
                disabled={submitting}
                className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold transition"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={submitWatchList}
                disabled={submitting}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black transition disabled:opacity-70"
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
          className={`fixed top-5 right-5 z-[60] px-4 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl text-sm font-semibold ${
            toast.type === 'error'
              ? 'bg-red-500/10 text-red-200 border-red-500/20'
              : 'bg-emerald-500/10 text-emerald-200 border-emerald-500/20'
          }`}
        >
          {toast.message}
        </div>
      )}
   </div>
  </>
  );
};

export default Movies;