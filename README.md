# KPhim 🎬

Website xem phim online miễn phí, sử dụng [OPhim API](https://ophim1.com) làm backend.

## Stack

- **React 18** + **React Router v6**
- **Vite 5** (dev server + build)
- **HLS.js** (phát video m3u8)
- Không dùng CSS framework — thuần CSS với CSS variables

## Cấu trúc thư mục

```
src/
├── api/
│   └── ophim.js          # Tất cả API calls đến OPhim
├── components/
│   ├── HeroBanner.jsx     # Banner slideshow trang chủ
│   ├── MovieCard.jsx      # Card 1 phim
│   ├── MovieGrid.jsx      # Grid nhiều phim + empty state
│   ├── Navbar.jsx         # Thanh điều hướng
│   ├── Pagination.jsx     # Phân trang
│   ├── SkeletonGrid.jsx   # Loading skeleton
│   └── VideoPlayer.jsx    # HLS player
├── constants/
│   └── config.js          # API_BASE, NAV_LINKS, ...
├── hooks/
│   ├── useDebounce.js     # Debounce cho search input
│   └── useMovies.js       # Generic hook fetch phim + phân trang
├── pages/
│   ├── CategoryPage.jsx   # /the-loai/:slug
│   ├── DetailPage.jsx     # /phim/:slug
│   ├── HomePage.jsx       # /
│   └── SearchPage.jsx     # /tim-kiem?q=...
└── utils/
    └── helpers.js         # imgUrl, normalizeMovieList, ...
```

## Cài đặt & chạy

```bash
# 1. Cài dependencies
pnpm install

# 2. Chạy dev server
pnpm dev
# → http://localhost:5173

# 3. Build production
pnpm build
```

## Deploy lên Vercel (cách nhanh nhất)

```bash
pnpm dlx vercel
```

Hoặc kéo thả thư mục `dist/` vào [vercel.com](https://vercel.com).

## Thay đổi API

Nếu `ophim1.com` đổi domain, chỉ cần sửa 1 dòng:

```js
// src/constants/config.js
export const API_BASE = 'https://domain-moi.com';
```

## Thêm tính năng

- **Lịch sử xem**: dùng `localStorage` trong `useMovies`
- **Tìm kiếm realtime**: dùng `useDebounce` đã có sẵn
- **Quốc gia**: `ophimApi.getByCountry(slug)` đã có trong `api/ophim.js`
