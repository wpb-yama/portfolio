import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/lab/youtube-tool/app',
        destination: '/youtube-tool/index.html',
      },
      {
        source: '/lab/apex-legends/app',
        destination: '/lab/apex-legends/app/index.html',
      },
      {
        source: '/lab/apex-legends/app/:path*',
        destination: '/lab/apex-legends/app/index.html',
      },
    ]
  },
};

export default nextConfig;
