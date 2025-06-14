/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.glodinasmakelaardij.nl',
  },
  // Configure image domains for external images
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'api.glodinasmakelaardij.nl',
      'glodinasmakelaardij.nl',
      'www.glodinasmakelaardij.nl',
      'res.cloudinary.com'
    ],
    unoptimized: false,
  },
  // Allow CORS from the API domain in development
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
    ];
  },
  // Configure allowed origins for development
  allowedDevOrigins: ['https://3000-ivfjd7xqkh8akin2usz69-382d2a22.manusvm.computer'],
}

module.exports = nextConfig

