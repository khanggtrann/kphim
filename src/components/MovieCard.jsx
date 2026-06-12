import { imgUrl } from '../utils/helpers';

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="44" height="44"
      style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,.5))' }}>
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

export function MovieCard({ movie, onClick }) {
  const thumb   = movie.thumb_url || movie.poster_url || '';
  const epLabel = movie.episode_current || '';

  return (
    <div className="movie-card" onClick={() => onClick?.(movie)} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(movie)}>
      <div className="movie-thumb">
        <img
          src={imgUrl(thumb)}
          alt={movie.name}
          loading="lazy"
          onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x450/1c1c23/5a5a6e?text=?'; }}
        />
        <div className="movie-thumb-overlay">
          <span className="play-icon"><PlayIcon /></span>
        </div>
        {epLabel && <span className="movie-ep-badge">{epLabel}</span>}
        {movie.quality && <span className="movie-quality">{movie.quality}</span>}
      </div>

      <div className="movie-info">
        <div className="movie-title">{movie.name}</div>
        <div className="movie-sub">{movie.origin_name || movie.year || ''}</div>
      </div>
    </div>
  );
}
