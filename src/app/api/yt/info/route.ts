import { NextRequest, NextResponse } from 'next/server'
import ytdl from '@distube/ytdl-core'

export const runtime = 'nodejs'
export const maxDuration = 30

export async function POST(req: NextRequest) {
  const { url } = await req.json()
  if (!url?.trim()) return NextResponse.json({ error: 'URL is required' }, { status: 400 })

  try {
    const info = await ytdl.getInfo(url.trim())
    const v = info.videoDetails

    // Only return combined av formats (no ffmpeg available server-side)
    const seen = new Map<number, object>()
    for (const f of info.formats) {
      if (f.container === 'mp4' && f.height && f.hasVideo && f.hasAudio && !seen.has(f.height)) {
        seen.set(f.height, {
          format_id: f.itag.toString(),
          ext: 'mp4',
          height: f.height,
          filesize: f.contentLength ? Number(f.contentLength) : null,
        })
      }
    }
    const formats = [...seen.values()].sort((a: any, b: any) => b.height - a.height)

    // Normalise publish date to YYYYMMDD
    let upload_date: string | null = null
    if (v.publishDate) {
      const clean = v.publishDate.replace(/-/g, '')
      if (/^\d{8}/.test(clean)) upload_date = clean.slice(0, 8)
    }

    return NextResponse.json({
      title: v.title,
      thumbnail: v.thumbnails.at(-1)?.url ?? null,
      duration: Number(v.lengthSeconds),
      channel: v.author?.name ?? null,
      channel_follower_count: v.author?.subscriber_count ?? null,
      view_count: Number(v.viewCount),
      upload_date,
      formats,
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
