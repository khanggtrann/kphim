/**
 * Toggle lọc phim có bản lồng tiếng.
 *
 * Lưu ý: OPhim không hỗ trợ lọc theo ngôn ngữ ở phía server, nên bộ lọc này
 * chỉ áp dụng trên các phim ĐÃ TẢI của trang hiện tại.
 *
 * @param {boolean}  value    - Đang bật lọc hay không
 * @param {Function} onChange - (next: boolean) => void
 */
export function LangFilter({ value, onChange }) {
  return (
    <button
      type="button"
      className={`lang-filter${value ? ' active' : ''}`}
      onClick={() => onChange(!value)}
      aria-pressed={value}
      title="Chỉ hiển thị phim có bản lồng tiếng (trong trang hiện tại)"
    >
      <span className="lang-filter-dot" aria-hidden="true" />
      Lồng tiếng
    </button>
  );
}
