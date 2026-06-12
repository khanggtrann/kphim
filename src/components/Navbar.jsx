import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../constants/config';

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  );
}

export function Navbar() {
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
