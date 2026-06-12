import { useState, useEffect } from 'react';
import { imgUrl } from '../utils/helpers';

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

export function HeroBanner({ movies, onMovieClick }) {
  const [current, setCurrent] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    if (!movies.length) return;
    const t = setInterval(
      () => setCurrent((i) => (i + 1) % movies.length),
      5000,
    );
    return () => clearInterval(t);
  }, [movies.length]);

  if (!movies.length) return null;

  return (
    <div className="hero" aria-label="Phim nổi bật">
      {/* Slides */}
      <div
        className="hero-slides"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {movies.map((movie, i) => (
          <div
            key={movie.slug ?? i}
            className="hero-slide"
            onClick={() => onMovieClick(movie)}
            role="button"
            tabIndex={0}
            aria-label={`Xem ${movie.name}`}
            onKeyDown={(e) => e.key === 'Enter' && onMovieClick(movie)}
          >
            <img
              src={imgUrl(movie.thumb_url || movie.poster_url)}
              alt={movie.name}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div className="hero-info">
              <h2>{movie.name}</h2>
              {movie.origin_name && <p>{movie.origin_name}</p>}
              <div className="hero-meta">
                {movie.year           && <span className="badge badge-year">{movie.year}</span>}
                {movie.quality        && <span className="badge badge-rating">⭐ {movie.quality}</span>}
                {movie.episode_current && <span className="badge badge-status">{movie.episode_current}</span>}
              </div>
              <button className="btn-watch" tabIndex={-1}>
                <PlayIcon /> Xem ngay
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="hero-dots" role="tablist" aria-label="Chọn slide">
        {movies.map((_, i) => (
          <span
            key={i}
            className={`hero-dot${i === current ? ' active' : ''}`}
            onClick={() => setCurrent(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
