import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroBanner } from '../components/HeroBanner';
import { MovieGrid }  from '../components/MovieGrid';
import { Pagination } from '../components/Pagination';
import { useMovies }  from '../hooks/useMovies';
import { ophimApi }   from '../api/ophim';

export function HomePage() {
  const navigate = useNavigate();
  const fetcher  = useCallback((page) => ophimApi.getNewMovies(page), []);
  const { movies, loading, page, setPage, totalPages } = useMovies(fetcher);

  // 5 phim đầu vào hero, còn lại vào grid
  const heroMovies = movies.slice(0, 5);
  const gridMovies = movies.slice(5);

  function handleMovieClick(movie) {
    navigate(`/phim/${movie.slug}`);
  }

  return (
    <main>
      {!loading && <HeroBanner movies={heroMovies} onMovieClick={handleMovieClick} />}

      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Phim mới cập nhật</h2>
        </div>

        <MovieGrid
          movies={gridMovies}
          loading={loading}
          onMovieClick={handleMovieClick}
        />

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </main>
  );
}
