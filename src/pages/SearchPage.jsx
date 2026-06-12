import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MovieGrid }  from '../components/MovieGrid';
import { Pagination } from '../components/Pagination';
import { useMovies }  from '../hooks/useMovies';
import { ophimApi }   from '../api/ophim';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query    = searchParams.get('q') ?? '';
  const navigate = useNavigate();

  const fetcher = useCallback(
    (page) => ophimApi.search(query, page),
    [query],
  );
  const { movies, loading, page, setPage, totalPages } = useMovies(fetcher, [query]);

  function handleMovieClick(movie) {
    navigate(`/phim/${movie.slug}`);
  }

  return (
    <main>
      <div className="search-header">
        <h2>
          Kết quả tìm kiếm: <span>"{query}"</span>
        </h2>
        {!loading && (
          <p style={{ color: 'var(--text2)', fontSize: 13, marginTop: 4 }}>
            Tìm thấy {movies.length} phim
          </p>
        )}
      </div>

      <MovieGrid
        movies={movies}
        loading={loading}
        emptyMessage={`Không tìm thấy phim nào với từ khóa "${query}"`}
        onMovieClick={handleMovieClick}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </main>
  );
}
