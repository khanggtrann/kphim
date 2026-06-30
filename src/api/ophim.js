import { API_BASE } from '../constants/config';

async function fetcher(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return res.json();
}

export const ophimApi = {
  /** Phim mới cập nhật */
  getNewMovies: (page = 1) =>
    fetcher(`${API_BASE}/danh-sach/phim-moi-cap-nhat?page=${page}`),

  /** Tìm kiếm theo từ khóa */
  search: (keyword, page = 1) =>
    fetcher(`${API_BASE}/v1/api/tim-kiem?keyword=${encodeURIComponent(keyword)}&page=${page}`),

  /** Chi tiết + danh sách tập của 1 phim */
  getMovieDetail: (slug) =>
    fetcher(`${API_BASE}/phim/${slug}`),

  /** Danh sách phim theo thể loại (genre: hành động, tình cảm, ...) */
  getByCategory: (slug, page = 1) =>
    fetcher(`${API_BASE}/v1/api/the-loai/${slug}?page=${page}`),

  /** Danh sách phim theo loại (phim bộ, phim lẻ, hoạt hình, chiếu rạp, ...) */
  getByList: (slug, page = 1) =>
    fetcher(`${API_BASE}/v1/api/danh-sach/${slug}?page=${page}`),

  /** Danh sách phim theo quốc gia */
  getByCountry: (slug, page = 1) =>
    fetcher(`${API_BASE}/v1/api/quoc-gia/${slug}?page=${page}`),

  /**
   * Lọc kết hợp nhiều tiêu chí (thể loại + quốc gia + năm) cùng lúc.
   * Dùng base `phim-moi` để bao gồm mọi loại phim (bộ / lẻ / hoạt hình).
   */
  filter: ({ category, country, year, page = 1 } = {}) => {
    const qs = new URLSearchParams({ page: String(page) });
    if (category) qs.set('category', category);
    if (country)  qs.set('country', country);
    if (year)     qs.set('year', String(year));
    return fetcher(`${API_BASE}/v1/api/danh-sach/phim-moi?${qs.toString()}`);
  },
};
