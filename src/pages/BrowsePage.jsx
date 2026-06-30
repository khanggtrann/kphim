import { useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MovieGrid }  from '../components/MovieGrid';
import { Pagination } from '../components/Pagination';
import { useMovies }  from '../hooks/useMovies';
import { ophimApi }   from '../api/ophim';
import { hasLongTieng } from '../utils/helpers';
import { GENRES, COUNTRIES } from '../constants/config';

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

export function BrowsePage({ onOpenFilter }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const category = params.get('the-loai') || '';
  const country  = params.get('quoc-gia') || '';
  const year     = params.get('nam') || '';
  const ltOnly   = params.get('lt') === '1';

  const fetcher = useCallback(
    (page) => ophimApi.filter({ category, country, year, page }),
    [category, country, year],
  );
  const { movies, loading, page, setPage, totalPages } =
    useMovies(fetcher, [category, country, year]);

  const visible = useMemo(
    () => (ltOnly ? movies.filter(hasLongTieng) : movies),
    [movies, ltOnly],
  );

  // Chip lọc đang áp dụng — bấm để gỡ
  const chips = [
    category && { key: 'the-loai', label: GENRES.find((g) => g.slug === category)?.name ?? category },
    country  && { key: 'quoc-gia', label: COUNTRIES.find((c) => c.slug === country)?.name ?? country },
    year     && { key: 'nam',      label: `Năm ${year}` },
    ltOnly   && { key: 'lt',       label: 'Lồng tiếng' },
  ].filter(Boolean);

  function removeChip(key) {
    const next = new URLSearchParams(params);
    next.delete(key);
    navigate(`/duyet${next.toString() ? `?${next}` : ''}`);
  }

  function handleMovieClick(movie) {
    navigate(`/phim/${movie.slug}`);
  }

  return (
    <main>
      <div className="section-header" style={{ marginBottom: 16 }}>
        <h2 className="section-title">Duyệt phim</h2>
        <button type="button" className="lang-filter" onClick={onOpenFilter}>
          <FilterIcon /> Bộ lọc
        </button>
      </div>

      {chips.length > 0 ? (
        <div className="active-filters">
          {chips.map((c) => (
            <button key={c.key} type="button" className="filter-chip" onClick={() => removeChip(c.key)}>
              {c.label} <span aria-hidden="true">✕</span>
            </button>
          ))}
          <button type="button" className="filter-chip-clear" onClick={() => navigate('/duyet')}>
            Xóa tất cả
          </button>
        </div>
      ) : (
        <p className="browse-hint">Chưa chọn bộ lọc — đang hiển thị phim mới nhất. Bấm “Bộ lọc” để kết hợp thể loại, quốc gia và năm.</p>
      )}

      <MovieGrid
        movies={visible}
        loading={loading}
        emptyMessage={ltOnly ? 'Không có phim lồng tiếng khớp bộ lọc trên trang này.' : 'Không có phim nào khớp bộ lọc.'}
        onMovieClick={handleMovieClick}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </main>
  );
}
