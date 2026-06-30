import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MovieGrid }  from '../components/MovieGrid';
import { Pagination } from '../components/Pagination';
import { LangFilter } from '../components/LangFilter';
import { useMovies }  from '../hooks/useMovies';
import { ophimApi }   from '../api/ophim';
import { hasLongTieng } from '../utils/helpers';
import { NAV_LINKS, GENRES, COUNTRIES } from '../constants/config';

/**
 * @param {'the-loai'|'danh-sach'|'quoc-gia'} type
 *   - 'the-loai'  → thể loại (genre): hành động, tình cảm, ...
 *   - 'danh-sach' → loại phim: phim bộ, phim lẻ, hoạt hình, chiếu rạp, ...
 *   - 'quoc-gia'  → quốc gia: hàn quốc, trung quốc, ...
 */
export function CategoryPage({ type = 'the-loai' }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [longTiengOnly, setLongTiengOnly] = useState(false);

  const title =
    NAV_LINKS.find((l) => l.path === `/${type}/${slug}`)?.categoryName ??
    (type === 'the-loai' ? GENRES.find((g) => g.slug === slug)?.name : null) ??
    (type === 'quoc-gia' ? COUNTRIES.find((c) => c.slug === slug)?.name : null) ??
    slug;

  const fetcher = useCallback(
    (page) => {
      if (type === 'danh-sach') return ophimApi.getByList(slug, page);
      if (type === 'quoc-gia')  return ophimApi.getByCountry(slug, page);
      return ophimApi.getByCategory(slug, page);
    },
    [type, slug],
  );
  const { movies, loading, page, setPage, totalPages } = useMovies(fetcher, [slug, type]);

  const visibleMovies = useMemo(
    () => (longTiengOnly ? movies.filter(hasLongTieng) : movies),
    [movies, longTiengOnly],
  );

  function handleMovieClick(movie) {
    navigate(`/phim/${movie.slug}`);
  }

  return (
    <main>
      <div className="section-header" style={{ marginBottom: 20 }}>
        <h2 className="section-title">{title}</h2>
        <LangFilter value={longTiengOnly} onChange={setLongTiengOnly} />
      </div>

      <MovieGrid
        movies={visibleMovies}
        loading={loading}
        emptyMessage={longTiengOnly ? 'Không có phim lồng tiếng trên trang này.' : 'Không có phim nào.'}
        onMovieClick={handleMovieClick}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </main>
  );
}
