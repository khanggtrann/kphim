import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MovieGrid }  from '../components/MovieGrid';
import { Pagination } from '../components/Pagination';
import { useMovies }  from '../hooks/useMovies';
import { ophimApi }   from '../api/ophim';
import { NAV_LINKS }  from '../constants/config';

/**
 * @param {'the-loai'|'danh-sach'} type
 *   - 'the-loai'  → thể loại (genre): hành động, tình cảm, ...
 *   - 'danh-sach' → loại phim: phim bộ, phim lẻ, hoạt hình, chiếu rạp, ...
 */
export function CategoryPage({ type = 'the-loai' }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const title = NAV_LINKS.find((l) => l.path === `/${type}/${slug}`)?.categoryName ?? slug;

  const fetcher = useCallback(
    (page) =>
      type === 'danh-sach'
        ? ophimApi.getByList(slug, page)
        : ophimApi.getByCategory(slug, page),
    [type, slug],
  );
  const { movies, loading, page, setPage, totalPages } = useMovies(fetcher, [slug]);

  function handleMovieClick(movie) {
    navigate(`/phim/${movie.slug}`);
  }

  return (
    <main>
      <div className="section-header" style={{ marginBottom: 20 }}>
        <h2 className="section-title">{title}</h2>
      </div>

      <MovieGrid movies={movies} loading={loading} onMovieClick={handleMovieClick} />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </main>
  );
}
