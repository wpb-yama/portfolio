'use client';

import { useEffect, useState } from 'react';
/* ── Spotify logo mark (white) ──────────────────────────── */
const SpotifyLogo = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.517 17.316a.75.75 0 01-1.031.25c-2.824-1.726-6.38-2.117-10.567-1.16a.75.75 0 01-.334-1.463c4.583-1.047 8.515-.596 11.682 1.342a.75.75 0 01.25 1.031zm1.474-3.28a.938.938 0 01-1.288.31c-3.232-1.986-8.158-2.562-11.982-1.402a.937.937 0 01-.542-1.794c4.368-1.322 9.8-.682 13.502 1.598a.937.937 0 01.31 1.288zm.127-3.41c-3.877-2.302-10.277-2.514-13.983-1.39a1.124 1.124 0 11-.652-2.151c4.25-1.29 11.318-1.041 15.786 1.607a1.125 1.125 0 01-1.151 1.934z" />
  </svg>
);

/* ── Album art placeholder ───────────────────────────────── */
const AlbumPlaceholder = () => (
  <div className="w-[120px] h-[120px] rounded-[8px] bg-[#e8e4de] flex items-center justify-center flex-shrink-0">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  </div>
);

/* ── Loading skeleton ────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="relative bg-white rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.07)] p-5 w-full">
      <div className="absolute top-4 right-4 w-[42px] h-[42px] rounded-[12px] bg-[#F0F0F0] animate-pulse" />
      <div className="w-[120px] h-[120px] rounded-[8px] bg-[#F0F0F0] animate-pulse" />
      <div className="mt-[14px] space-y-2">
        <div className="h-4 w-3/4 rounded bg-[#F0F0F0] animate-pulse" />
        <div className="h-3 w-1/2 rounded bg-[#F0F0F0] animate-pulse" />
      </div>
      <div className="mt-[14px] h-[40px] rounded-[40px] bg-[#F0F0F0] animate-pulse" />
    </div>
  );
}

/* ── Widget ──────────────────────────────────────────────── */
export default function SpotifyWidget() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const res = await fetch('/api/spotify');
      const json = await res.json();
      setData(json);
    } catch {
      // keep previous data on error
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 30_000);
    return () => clearInterval(id);
  }, []);

  if (loading) return <SkeletonCard />;

  const track = data?.track;
  const status = data?.status;
  const isPlaying = status === 'playing';
  const isEmpty = !track || status === 'empty' || status === 'error';

  const progressPct =
    isPlaying && track?.durationMs && track?.progressMs
      ? Math.min((track.progressMs / track.durationMs) * 100, 100)
      : 0;

  return (
    <div className="relative bg-white rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.07)] p-5 w-full">

      {/* Spotify badge — absolute top-right, bleed origin */}
      <a
        href={track?.url || 'https://open.spotify.com'}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open on Spotify"
        className="absolute top-4 right-4 w-[42px] h-[42px] rounded-[12px] bg-[#1DB954] flex items-center justify-center hover:opacity-90 transition-opacity z-10"
      >
        <SpotifyLogo size={24} />
      </a>

      {/* Album art */}
      {isEmpty || !track?.albumArt ? (
        <AlbumPlaceholder />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={track.albumArt}
          alt={track.album}
          className="w-[120px] h-[120px] rounded-[8px] object-cover block"
        />
      )}

      {/* Track info */}
      <div className="mt-[14px]">
        {isEmpty ? (
          <p className="spotify-track-name text-[15px] font-medium text-[#888] transition-colors duration-300">
            Nothing recently played
          </p>
        ) : (
          <>
            <div className="flex items-center gap-[6px] flex-wrap">
              <span className="spotify-track-name text-[16px] font-semibold text-[#1a1a1a] leading-tight transition-colors duration-300">
                {track.name}
              </span>
              {track.explicit && (
                <span className="text-[10px] font-bold bg-[#888] text-white px-[5px] py-[1px] rounded-[3px] leading-[1.4] flex-shrink-0">
                  E
                </span>
              )}
            </div>
            <p className="spotify-track-meta text-[13px] text-[#888] mt-[3px] transition-colors duration-300">
              {track.artist} — {track.album}
            </p>
          </>
        )}
      </div>

      {/* Static progress bar — shown only when actively playing */}
      {isPlaying && (
        <div className="mt-[12px] relative h-[3px] bg-[#EBEBEB] rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-[#1DB954] rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      )}

      {/* Last played / Now playing pill */}
      <div className="spotify-last-pill mt-[14px] bg-[#f4f4f4] rounded-[40px] py-[10px] px-[16px] text-[13px] font-medium text-[#888] text-center w-full transition-all duration-300">
        {isPlaying ? 'Now playing' : 'Last played'}
      </div>

    </div>
  );
}
