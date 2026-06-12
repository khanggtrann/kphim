import { MovieCard }   from './MovieCard';
import { SkeletonGrid } from './SkeletonGrid';

function FilmIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5" />
    </svg>
  );
}

export function MovieGrid({ movies, loading, emptyMessage = 'Không có phim nào.', onMovieClick }) {
  if (loading) return <SkeletonGrid />;

  if (!movies.length) {
    return (
      <div className="empty-state">
        <FilmIcon />
        <p style={{ marginTop: 12 }}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((m) => (
        <MovieCard key={m._id || m.slug} movie={m} onClick={onMovieClick} />
      ))}
    </div>
  );
}
