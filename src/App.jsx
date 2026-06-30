import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PasswordGate } from './components/PasswordGate';
import { Navbar }       from './components/Navbar';
import { HomePage }     from './pages/HomePage';
import { DetailPage }   from './pages/DetailPage';
import { SearchPage }   from './pages/SearchPage';
import { CategoryPage } from './pages/CategoryPage';

export default function App() {
  return (
    <PasswordGate>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Navbar />
      <Routes>
        <Route path="/"                element={<HomePage />}     />
        <Route path="/phim/:slug"      element={<DetailPage />}   />
        <Route path="/tim-kiem"        element={<SearchPage />}   />
        <Route path="/the-loai/:slug"  element={<CategoryPage type="the-loai" />} />
        <Route path="/danh-sach/:slug" element={<CategoryPage type="danh-sach" />} />
        <Route path="/quoc-gia/:slug"  element={<CategoryPage type="quoc-gia" />} />
        {/* Fallback */}
        <Route path="*" element={
          <main style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text2)' }}>
            <h2 style={{ fontSize: 48, marginBottom: 12, color: 'var(--text3)' }}>404</h2>
            <p>Trang không tồn tại.</p>
          </main>
        } />
      </Routes>
    </BrowserRouter>
    </PasswordGate>
  );
}
