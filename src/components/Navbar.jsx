import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { NAV_LINKS, GENRES, COUNTRIES } from '../constants/config';

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/**
 * Dropdown nav dùng chung cho Thể loại / Quốc gia.
 *
 * @param {string} label    - Nhãn nút (vd: "Thể loại")
 * @param {string} basePath - Tiền tố route (vd: "/the-loai")
 * @param {Array}  items    - [{ slug, name }]
 */
function NavDropdown({ label, basePath, items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="nav-dropdown" ref={ref}>
      <button
        type="button"
        className={`nav-link nav-dropdown-toggle${open ? ' active' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {label}
        <ChevronIcon />
      </button>

      {open && (
        <div className="nav-dropdown-menu" role="menu">
          {items.map((it) => (
            <NavLink
              key={it.slug}
              to={`${basePath}/${it.slug}`}
              className={({ isActive }) => `nav-dropdown-item${isActive ? ' active' : ''}`}
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              {it.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar({ onOpenFilter }) {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    navigate(`/tim-kiem?q=${encodeURIComponent(q)}`);
    setInput('');
  }

  return (
    <nav>
      <div className="nav-inner">
        <Link to="/" className="logo">
          K<span>Phim</span>
        </Link>

        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              end={link.path === '/'}
            >
              {link.label}
            </NavLink>
          ))}
          <NavDropdown label="Thể loại" basePath="/the-loai" items={GENRES} />
          <NavDropdown label="Quốc gia" basePath="/quoc-gia" items={COUNTRIES} />
          <button type="button" className="nav-link nav-filter-btn" onClick={onOpenFilter}>
            <FilterIcon /> Bộ lọc
          </button>
        </div>

        <div className="nav-search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Tìm kiếm phim..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Tìm kiếm phim"
            />
            <span className="search-icon" aria-hidden="true">
              <SearchIcon />
            </span>
          </form>
        </div>
      </div>
    </nav>
  );
}
