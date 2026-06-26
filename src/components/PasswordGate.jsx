import { useState, useEffect } from 'react';

// ── CONFIG ───────────────────────────────────────────────────────
const PASSWORD   = '030908';
const STORAGE_KEY = 'kphim_access';
const TTL_MS      = 24 * 60 * 60 * 1000; // how long access lasts: 1 day
// ─────────────────────────────────────────────────────────────────

function hasValidAccess() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const { expires } = JSON.parse(raw);
    return typeof expires === 'number' && Date.now() < expires;
  } catch {
    return false;
  }
}

export function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(hasValidAccess);
  const [value, setValue]       = useState('');
  const [error, setError]       = useState(false);

  // Re-lock automatically when the session expires while the tab is open.
  useEffect(() => {
    if (!unlocked) return;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const { expires } = JSON.parse(raw);
    const remaining = expires - Date.now();
    if (remaining <= 0) { setUnlocked(false); return; }
    const t = setTimeout(() => setUnlocked(false), remaining);
    return () => clearTimeout(t);
  }, [unlocked]);

  if (unlocked) return children;

  const submit = (e) => {
    e.preventDefault();
    if (value === PASSWORD) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ expires: Date.now() + TTL_MS }),
      );
      setUnlocked(true);
    } else {
      setError(true);
      setValue('');
    }
  };

  return (
    <div style={styles.overlay}>
      <form onSubmit={submit} style={styles.card}>
        <div style={styles.logo}>KPhim</div>
        <p style={styles.hint}>Nhập mật khẩu để vào trang</p>
        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false); }}
          placeholder="Mật khẩu"
          style={{ ...styles.input, borderColor: error ? '#ef4444' : 'var(--border)' }}
        />
        {error && <p style={styles.error}>Mật khẩu không đúng. Thử lại.</p>}
        <button type="submit" style={styles.button}>Vào trang</button>
      </form>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 9999,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--bg)', padding: 20,
  },
  card: {
    width: '100%', maxWidth: 340,
    display: 'flex', flexDirection: 'column', gap: 14,
    background: 'var(--bg2)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', padding: '32px 28px',
  },
  logo: { fontSize: 28, fontWeight: 800, color: 'var(--accent)', textAlign: 'center' },
  hint: { color: 'var(--text2)', textAlign: 'center', fontSize: 14 },
  input: {
    width: '100%', padding: '12px 14px', fontSize: 16,
    background: 'var(--bg3)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)', color: 'var(--text)', outline: 'none',
  },
  error: { color: '#ef4444', fontSize: 13, textAlign: 'center', marginTop: -6 },
  button: {
    width: '100%', padding: '12px', fontSize: 15, fontWeight: 700,
    background: 'var(--accent)', color: '#0d0d0f',
    borderRadius: 'var(--radius-sm)',
  },
};
