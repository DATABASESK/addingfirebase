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
    unoptimized: true, // ✅ Enables Next.js image optimization
    minimumCacheTTL: 60 * 60 * 24 * 7, // ✅ Cache images for 7 days (improves speed)
    formats: ['image/avif', 'image/webp'], // ✅ Uses modern, high-quality formats
    deviceSizes: [320, 420, 768, 1024, 1200, 1600], // ✅ Responsive image sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // ✅ Optimized for different screen resolutions
  },
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    RABBIT_API_KEY: process.env.RABBIT_API_KEY
  },

  // ✅ Security Headers
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
