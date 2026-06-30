import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GENRES, COUNTRIES } from '../constants/config';

const THIS_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: THIS_YEAR - 1999 }, (_, i) => THIS_YEAR - i);

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/**
 * Bảng lọc trượt từ phải sang, cho phép kết hợp Thể loại + Quốc gia + Năm
 * + Lồng tiếng. Khi "Áp dụng" sẽ điều hướng tới /duyet với query tương ứng.
 */
export function FilterDrawer({ open, onClose }) {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [category, setCategory] = useState('');
  const [country,  setCountry]  = useState('');
  const [year,     setYear]     = useState('');
  const [lt,       setLt]       = useState(false);

  // Đồng bộ giá trị từ URL mỗi khi mở bảng lọc
  useEffect(() => {
    if (!open) return;
    setCategory(params.get('the-loai') || '');
    setCountry(params.get('quoc-gia') || '');
    setYear(params.get('nam') || '');
    setLt(params.get('lt') === '1');
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Esc để đóng + khóa scroll nền khi mở
  useEffect(() => {
    if (!open) return;
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  function apply() {
    const qs = new URLSearchParams();
    if (category) qs.set('the-loai', category);
    if (country)  qs.set('quoc-gia', country);
    if (year)     qs.set('nam', year);
    if (lt)       qs.set('lt', '1');
    navigate(`/duyet${qs.toString() ? `?${qs}` : ''}`);
    onClose();
  }

  function reset() {
    setCategory(''); setCountry(''); setYear(''); setLt(false);
  }

  return (
    <>
      <div
        className={`drawer-overlay${open ? ' open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`filter-drawer${open ? ' open' : ''}`}
        role="dialog"
        aria-label="Bộ lọc phim"
        aria-hidden={!open}
      >
        <div className="drawer-header">
          <span>Bộ lọc</span>
          <button type="button" className="drawer-close" onClick={onClose} aria-label="Đóng">
            <CloseIcon />
          </button>
        </div>

        <div className="drawer-body">
          <label className="drawer-field">
            <span>Thể loại</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Tất cả</option>
              {GENRES.map((g) => <option key={g.slug} value={g.slug}>{g.name}</option>)}
            </select>
          </label>

          <label className="drawer-field">
            <span>Quốc gia</span>
            <select value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="">Tất cả</option>
              {COUNTRIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </label>

          <label className="drawer-field">
            <span>Năm</span>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">Tất cả</option>
              {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </label>

          <label className="drawer-check">
            <input type="checkbox" checked={lt} onChange={(e) => setLt(e.target.checked)} />
            <span>Chỉ phim lồng tiếng</span>
          </label>
        </div>

        <div className="drawer-footer">
          <button type="button" className="drawer-btn ghost" onClick={reset}>Xóa lọc</button>
          <button type="button" className="drawer-btn primary" onClick={apply}>Áp dụng</button>
        </div>
      </aside>
    </>
  );
}
