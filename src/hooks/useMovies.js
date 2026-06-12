import { useState, useEffect, useCallback } from 'react';
import { normalizeMovieList, normalizePagination } from '../utils/helpers';

/**
 * Generic hook để fetch danh sách phim có phân trang
 *
 * @param {Function} fetcher   - Hàm nhận (page) và trả về Promise
 * @param {Array}    resetDeps - Khi các deps này thay đổi, reset về page 1
 */
export function useMovies(fetcher, resetDeps = []) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Reset page về 1 khi deps thay đổi (ví dụ: slug category mới)
  useEffect(() => {
    setPage(1);
  }, resetDeps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetcher(page)
      .then((data) => {
        if (cancelled) return;
        setMovies(normalizeMovieList(data));
        const pagination = normalizePagination(data);
        setTotalPages(pagination.totalPages ?? 1);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [fetcher, page]);

  const goToPage = useCallback((p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { movies, loading, error, page, setPage: goToPage, totalPages };
}
