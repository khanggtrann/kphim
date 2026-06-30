import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroBanner } from '../components/HeroBanner';
import { MovieGrid }  from '../components/MovieGrid';
import { Pagination } from '../components/Pagination';
import { LangFilter } from '../components/LangFilter';
import { useMovies }  from '../hooks/useMovies';
import { ophimApi }   from '../api/ophim';
import { hasLongTieng } from '../utils/helpers';

export function HomePage() {
  const navigate = useNavigate();
  const fetcher  = useCallback((page) => ophimApi.getNewMovies(page), []);
  const { movies, loading, page, setPage, totalPages } = useMovies(fetcher);
  const [longTiengOnly, setLongTiengOnly] = useState(false);

  // 5 phim đầu vào hero, còn lại vào grid
  const heroMovies = movies.slice(0, 5);
  const gridMovies = useMemo(() => {
    const rest = movies.slice(5);
    return longTiengOnly ? rest.filter(hasLongTieng) : rest;
  }, [movies, longTiengOnly]);

  function handleMovieClick(movie) {
    navigate(`/phim/${movie.slug}`);
  }

  return (
    <main>
      {!loading && <HeroBanner movies={heroMovies} onMovieClick={handleMovieClick} />}

      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Phim mới cập nhật</h2>
          <LangFilter value={longTiengOnly} onChange={setLongTiengOnly} />
        </div>

        <MovieGrid
          movies={gridMovies}
          loading={loading}
          emptyMessage={longTiengOnly ? 'Không có phim lồng tiếng trên trang này.' : 'Không có phim nào.'}
          onMovieClick={handleMovieClick}
        />

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </main>
  );
}
