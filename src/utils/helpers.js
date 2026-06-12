import { IMG_BASE } from '../constants/config';

/**
 * Trả về URL ảnh đầy đủ từ path tương đối hoặc tuyệt đối
 */
export function imgUrl(path) {
  if (!path) return 'https://placehold.co/300x450/1c1c23/5a5a6e?text=KPhim';
  if (path.startsWith('http')) return path;
  return `${IMG_BASE}/${path}`;
}

/**
 * Normalize danh sách phim từ response của API (cấu trúc có thể khác nhau)
 */
export function normalizeMovieList(data) {
  return data?.items ?? data?.data?.items ?? [];
}

/**
 * Normalize thông tin phân trang.
 *
 * - Endpoint gốc (/danh-sach/phim-moi-cap-nhat) trả về `pagination` có sẵn `totalPages`.
 * - Endpoint /v1/api/* (tìm kiếm, thể loại, quốc gia) đặt pagination ở
 *   `data.params.pagination` và KHÔNG có `totalPages` — phải tự tính.
 */
export function normalizePagination(data) {
  const p = data?.pagination ?? data?.data?.params?.pagination ?? {};

  const totalPages =
    p.totalPages ??
    (p.totalItems && p.totalItemsPerPage
      ? Math.ceil(p.totalItems / p.totalItemsPerPage)
      : 1);

  return { ...p, totalPages };
}
