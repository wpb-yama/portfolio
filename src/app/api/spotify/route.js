export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

async function getAccessToken() {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  const data = await res.json();
  return data.access_token;
}

function formatTrack(track, progressMs = null) {
  return {
    name: track.name,
    artist: track.artists.map((a) => a.name).join(', '),
    album: track.album.name,
    albumArt: track.album.images[0]?.url ?? null,
    url: track.external_urls.spotify,
    durationMs: track.duration_ms,
    progressMs,
    explicit: track.explicit ?? false,
  };
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    const nowRes = await fetch(NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (nowRes.status !== 204 && nowRes.status !== 200) {
      throw new Error('Bad response from currently-playing');
    }

    if (nowRes.status === 200) {
      const nowData = await nowRes.json();
      if (nowData?.is_playing && nowData?.item) {
        return NextResponse.json(
          { status: 'playing', track: formatTrack(nowData.item, nowData.progress_ms) },
          { headers: { 'Cache-Control': 'no-store' } }
        );
      }
    }

    // Fallback to recently played
    const recentRes = await fetch(RECENTLY_PLAYED_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const recentData = await recentRes.json();
    const item = recentData.items?.[0];

    if (!item) {
      return NextResponse.json(
        { status: 'empty', track: null },
        { headers: { 'Cache-Control': 'no-store' } }
      );
    }

    return NextResponse.json(
      { status: 'recent', track: formatTrack(item.track, null) },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch {
    return NextResponse.json(
      { status: 'error', track: null },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
