export const API_BASE = 'https://ophim1.com';
export const IMG_BASE = 'https://img.ophim.live/uploads/movies';

export const NAV_LINKS = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Phim bộ',   path: '/danh-sach/phim-bo',    categoryName: 'Phim bộ' },
  { label: 'Phim lẻ',   path: '/danh-sach/phim-le',    categoryName: 'Phim lẻ' },
  { label: 'Anime',     path: '/danh-sach/hoat-hinh',  categoryName: 'Hoạt hình / Anime' },
  { label: 'Chiếu rạp', path: '/danh-sach/phim-chieu-rap', categoryName: 'Phim chiếu rạp' },
];

/** Thể loại (genres) — slug khớp với endpoint /v1/api/the-loai/:slug của OPhim */
export const GENRES = [
  { slug: 'hanh-dong',   name: 'Hành Động' },
  { slug: 'tinh-cam',    name: 'Tình Cảm' },
  { slug: 'hai-huoc',    name: 'Hài Hước' },
  { slug: 'co-trang',    name: 'Cổ Trang' },
  { slug: 'tam-ly',      name: 'Tâm Lý' },
  { slug: 'hinh-su',     name: 'Hình Sự' },
  { slug: 'chien-tranh', name: 'Chiến Tranh' },
  { slug: 'the-thao',    name: 'Thể Thao' },
  { slug: 'vo-thuat',    name: 'Võ Thuật' },
  { slug: 'vien-tuong',  name: 'Viễn Tưởng' },
  { slug: 'phieu-luu',   name: 'Phiêu Lưu' },
  { slug: 'khoa-hoc',    name: 'Khoa Học' },
  { slug: 'kinh-di',     name: 'Kinh Dị' },
  { slug: 'am-nhac',     name: 'Âm Nhạc' },
  { slug: 'than-thoai',  name: 'Thần Thoại' },
  { slug: 'tai-lieu',    name: 'Tài Liệu' },
  { slug: 'gia-dinh',    name: 'Gia Đình' },
  { slug: 'chinh-kich',  name: 'Chính Kịch' },
  { slug: 'bi-an',       name: 'Bí Ẩn' },
  { slug: 'hoc-duong',   name: 'Học Đường' },
  { slug: 'kinh-dien',   name: 'Kinh Điển' },
];

/** Quốc gia — slug khớp với endpoint /v1/api/quoc-gia/:slug của OPhim */
export const COUNTRIES = [
  { slug: 'viet-nam',   name: 'Việt Nam' },
  { slug: 'han-quoc',   name: 'Hàn Quốc' },
  { slug: 'trung-quoc', name: 'Trung Quốc' },
  { slug: 'nhat-ban',   name: 'Nhật Bản' },
  { slug: 'thai-lan',   name: 'Thái Lan' },
  { slug: 'au-my',      name: 'Âu Mỹ' },
  { slug: 'dai-loan',   name: 'Đài Loan' },
  { slug: 'hong-kong',  name: 'Hồng Kông' },
  { slug: 'an-do',      name: 'Ấn Độ' },
  { slug: 'anh',        name: 'Anh' },
  { slug: 'phap',       name: 'Pháp' },
  { slug: 'duc',        name: 'Đức' },
  { slug: 'canada',     name: 'Canada' },
  { slug: 'tay-ban-nha', name: 'Tây Ban Nha' },
  { slug: 'philippines', name: 'Philippines' },
];
