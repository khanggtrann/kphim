import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VideoPlayer } from '../components/VideoPlayer';
import { imgUrl }      from '../utils/helpers';
import { ophimApi }    from '../api/ophim';

/* ── Icons ── */
function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" /><path d="m12 5-7 7 7 7" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

/* ── Component ── */
export function DetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [data,      setData]      = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [serverIdx, setServerIdx] = useState(0);
  const [activeEp,  setActiveEp]  = useState(null); // index trong server hiện tại
  const [playUrl,   setPlayUrl]   = useState(null);

  useEffect(() => {
    setLoading(true);
    setPlayUrl(null);
    setActiveEp(null);
    setServerIdx(0);

    ophimApi.getMovieDetail(slug)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  /* ── Derived data ── */
  const movie    = data?.movie;
  const episodes = data?.episodes ?? [];
  const server   = episodes[serverIdx];
  const epList   = server?.server_data ?? [];

  function handlePlayEp(ep, idx) {
    const url = ep.link_m3u8 || ep.link_embed || '';
    setPlayUrl(url);
    setActiveEp(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <main>
        <div className="detail-layout">
          <div className="skeleton" style={{ aspectRatio: '2/3', borderRadius: 10 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="skeleton" style={{ height: 30, width: '60%', borderRadius: 6 }} />
            <div className="skeleton" style={{ height: 16, width: '35%', borderRadius: 4 }} />
            <div className="skeleton" style={{ height: 16, width: '45%', borderRadius: 4 }} />
          </div>
        </div>
      </main>
    );
  }

  if (!movie) {
    return (
      <main>
        <button className="detail-back" onClick={() => navigate(-1)}>
          <ArrowLeftIcon /> Quay lại
        </button>
        <p style={{ color: 'var(--text2)' }}>Không tìm thấy phim.</p>
      </main>
    );
  }

  const genres    = movie.category ?? [];
  const countries = movie.country  ?? [];

  return (
    <main>
      <button className="detail-back" onClick={() => navigate(-1)}>
        <ArrowLeftIcon /> Quay lại
      </button>

      {/* Player */}
      {playUrl && <VideoPlayer key={playUrl} m3u8Url={playUrl} />}

      {/* Info layout */}
      <div className="detail-layout">
        {/* Poster */}
        <div>
          <div className="detail-poster">
            <img
              src={imgUrl(movie.poster_url || movie.thumb_url)}
              alt={movie.name}
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x450/1c1c23/5a5a6e?text=?'; }}
            />
          </div>
        </div>

        {/* Meta */}
        <div className="detail-main">
          <h1>{movie.name}</h1>
          {movie.origin_name && <div className="sub-title">{movie.origin_name}</div>}

          <div className="detail-meta">
            {movie.year            && <span className="badge badge-year">{movie.year}</span>}
            {movie.episode_current && <span className="badge badge-status">{movie.episode_current}</span>}
            {movie.quality         && <span className="badge badge-rating">⭐ {movie.quality}</span>}
            {movie.time            && <span className="badge badge-year">⏱ {movie.time}</span>}
            {countries.map((c) => (
              <span key={c.id} className="badge badge-country">{c.name}</span>
            ))}
          </div>

          {movie.content && (
            <p className="detail-desc">
              {movie.content.replace(/<[^>]+>/g, '')}
            </p>
          )}

          {/* Thể loại */}
          {genres.length > 0 && (
            <div className="detail-categories">
              {genres.map((g) => (
                <span
                  key={g.id}
                  className="cat-tag"
                  onClick={() => navigate(`/the-loai/${g.slug}`)}
                >
                  {g.name}
                </span>
              ))}
            </div>
          )}

          {/* Chọn server (nếu có nhiều) */}
          {episodes.length > 1 && (
            <div style={{ marginBottom: 16 }}>
              <div className="eps-title">Server</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {episodes.map((s, i) => (
                  <button
                    key={i}
                    className={`ep-btn${serverIdx === i ? ' active' : ''}`}
                    onClick={() => { setServerIdx(i); setActiveEp(null); }}
                  >
                    {s.server_name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Danh sách tập */}
          {epList.length > 0 ? (
            <div className="eps-section">
              <div className="eps-title">Tập phim ({epList.length})</div>
              <div className="eps-grid">
                {epList.map((ep, i) => (
                  <button
                    key={i}
                    className={`ep-btn${activeEp === i ? ' active' : ''}`}
                    onClick={() => handlePlayEp(ep, i)}
                  >
                    {ep.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            episodes.length > 0 && (
              <button
                className="btn-watch"
                onClick={() => handlePlayEp(episodes[0]?.server_data?.[0] ?? {}, 0)}
              >
                <PlayIcon /> Xem ngay
              </button>
            )
          )}
        </div>
      </div>
    </main>
  );
}
