import { useState, useEffect } from 'react';

/**
 * Trì hoãn cập nhật giá trị — hữu ích khi search để tránh gọi API quá nhiều
 */
export function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
