/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      's4.anilist.co',
      "i.ytimg.com",
      'artworks.thetvdb.com',
      'media.kitsu.io',
      'media.kitsu.app',
      'kitsu-production-media.s3.us-west-002.backblazeb2.com',
      'media.themoviedb.org'
    ],
    unoptimized: true
  },
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    RABBIT_API_KEY: process.env.RABBIT_API_KEY
  },

  // Add custom headers for CSP and X-Frame-Options
  async headers() {
    return [
      {
        source: '/(.*)', // Apply to all routes
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://skyt-movies-app.onrender.com;",
          },
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM https://skmovies-cc.onrender.com',
          }
        ],
      },
    ];
  },
};

export default nextConfig;
