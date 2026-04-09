import { NextRequest, NextResponse } from 'next/server'
import { YoutubeTranscript } from 'youtube-transcript'

export const runtime = 'nodejs'
export const maxDuration = 30

function extractVideoId(url: string): string | null {
  const m = url.match(/(?:v=|youtu\.be\/|shorts\/)([A-Za-z0-9_-]{11})/)
  return m ? m[1] : null
}

export async function POST(req: NextRequest) {
  const { url } = await req.json()
  if (!url?.trim()) return NextResponse.json({ error: 'URL is required' }, { status: 400 })

  const videoId = extractVideoId(url.trim())
  if (!videoId) return NextResponse.json({ error: 'Could not extract video ID from URL' }, { status: 400 })

  try {
    const raw = await YoutubeTranscript.fetchTranscript(videoId)
    const entries = raw.map(e => ({
      start: e.offset / 1000, // offset is ms, start is seconds
      text: e.text,
    }))
    const text = entries.map(e => e.text).join(' ')
    return NextResponse.json({ transcript: text, video_id: videoId, entries })
  } catch (e: any) {
    const msg = e.message ?? ''
    if (msg.includes('disabled') || msg.includes('No transcript')) {
      return NextResponse.json({ error: 'Transcripts are disabled for this video' }, { status: 400 })
    }
    return NextResponse.json({ error: msg || 'No transcript found for this video' }, { status: 400 })
  }
}
