export function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const delta = 2;
  const pages = [];
  for (
    let i = Math.max(1, page - delta);
    i <= Math.min(totalPages, page + delta);
    i++
  ) {
    pages.push(i);
  }

  const first = pages[0];
  const last  = pages[pages.length - 1];

  return (
    <nav className="pagination" aria-label="Phân trang">
      <button
        className="page-btn"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Trang trước"
      >
        ‹
      </button>

      {first > 1 && (
        <>
          <button className="page-btn" onClick={() => onPageChange(1)}>1</button>
          {first > 2 && <span className="page-ellipsis">…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          className={`page-btn${p === page ? ' active' : ''}`}
          onClick={() => onPageChange(p)}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}

      {last < totalPages && (
        <>
          {last < totalPages - 1 && <span className="page-ellipsis">…</span>}
          <button className="page-btn" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}

      <button
        className="page-btn"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Trang sau"
      >
        ›
      </button>
    </nav>
  );
}
