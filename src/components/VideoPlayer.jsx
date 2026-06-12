import { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';

function AlertIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="13" />
      <circle cx="12" cy="16.5" r=".5" fill="currentColor" />
    </svg>
  );
}

export function VideoPlayer({ m3u8Url }) {
  const videoRef = useRef(null);
  const hlsRef   = useRef(null);
  const [status, setStatus] = useState('loading'); // loading | ready | error

  useEffect(() => {
    const video = videoRef.current;
    if (!m3u8Url || !video) return;

    setStatus('loading');

    function onReady()  { setStatus('ready'); }
    function onError()  { setStatus('error'); }

    if (Hls.isSupported()) {
      hlsRef.current?.destroy();
      const hls = new Hls({ enableWorker: false });
      hlsRef.current = hls;
      hls.loadSource(m3u8Url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        onReady();
        video.play().catch(() => {});
      });
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) onError();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari native HLS
      video.src = m3u8Url;
      video.addEventListener('loadedmetadata', onReady, { once: true });
      video.addEventListener('error', onError, { once: true });
      video.play().catch(() => {});
    } else {
      onError();
    }

    return () => {
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [m3u8Url]);

  return (
    <div className="player-wrap">
      {/* Loading overlay */}
      {status === 'loading' && (
        <div className="player-loading" style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
          <div className="spinner" />
          <span style={{ color: 'rgba(255,255,255,.5)', fontSize: 13 }}>Đang tải video…</span>
        </div>
      )}

      {/* Error state */}
      {status === 'error' && (
        <div className="player-error">
          <AlertIcon />
          <p>Không thể tải video. Thử chọn tập khác hoặc server khác.</p>
        </div>
      )}

      {/* Video element — always in DOM so ref stays valid */}
      <video
        ref={videoRef}
        controls
        style={{
          width: '100%',
          aspectRatio: '16/9',
          display: status === 'error' ? 'none' : 'block',
        }}
        onCanPlay={() => setStatus('ready')}
      />
    </div>
  );
}
