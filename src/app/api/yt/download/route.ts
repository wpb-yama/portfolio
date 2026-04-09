import { NextRequest } from 'next/server'
import ytdl from '@distube/ytdl-core'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  const { url, format_id } = await req.json()
  if (!url?.trim()) {
    return new Response(JSON.stringify({ error: 'URL is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const info = await ytdl.getInfo(url.trim())
    const format =
      info.formats.find(f => f.itag.toString() === format_id && f.hasVideo && f.hasAudio) ??
      ytdl.chooseFormat(info.formats, { quality: 'highestvideo', filter: f => !!(f.hasVideo && f.hasAudio) })

    const title = info.videoDetails.title.replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '_')

    const nodeStream = ytdl.downloadFromInfo(info, { format })

    const webStream = new ReadableStream({
      start(controller) {
        nodeStream.on('data', (chunk: Buffer) => controller.enqueue(new Uint8Array(chunk)))
        nodeStream.on('end', () => controller.close())
        nodeStream.on('error', (err: Error) => controller.error(err))
      },
      cancel() {
        nodeStream.destroy()
      },
    })

    return new Response(webStream, {
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="${title}.mp4"`,
      },
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
