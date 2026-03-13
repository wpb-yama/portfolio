// spotify-auth.mjs
// Run with: node spotify-auth.mjs
// Then open the URL it prints, authorise, and paste the redirected URL back in

import http from 'http'
import { exec } from 'child_process'
import readline from 'readline'

// ─── FILL THESE IN ───────────────────────────────────────
const CLIENT_ID     = 'fad42f7dafc445b795a0ff41dfce9355'
const CLIENT_SECRET = '99998e5959e5434eaed7e529adc37936' // ← paste your Client Secret here
const REDIRECT_URI  = 'https://willbooth.dev/api/spotify/callback'
// ─────────────────────────────────────────────────────────

const SCOPES = [
  'user-read-currently-playing',
  'user-read-recently-played'
].join('%20')

const authUrl =
  `https://accounts.spotify.com/authorize` +
  `?client_id=${CLIENT_ID}` +
  `&response_type=code` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&scope=${SCOPES}`

console.log('\n─────────────────────────────────────────────')
console.log('1. Open this URL in your browser:\n')
console.log(authUrl)
console.log('\n─────────────────────────────────────────────')
console.log('2. Authorise the app, then paste the full redirect URL below:')
console.log('   (it will look like: http://localhost:3000/api/spotify/callback?code=...)\n')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

rl.question('Paste URL here: ', async (redirectedUrl) => {
  rl.close()

  const code = new URL(redirectedUrl).searchParams.get('code')
  if (!code) {
    console.error('❌ No code found in URL. Make sure you pasted the full redirect URL.')
    process.exit(1)
  }

  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type:   'authorization_code',
      code,
      redirect_uri: REDIRECT_URI
    })
  })

  const data = await res.json()

  if (data.error) {
    console.error('❌ Error:', data.error, data.error_description)
    process.exit(1)
  }

  console.log('\n✅ Success! Add these to your .env.local:\n')
  console.log(`SPOTIFY_CLIENT_ID=${CLIENT_ID}`)
  console.log(`SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}`)
  console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`)
  console.log('\n─────────────────────────────────────────────\n')
})
