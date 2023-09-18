/* eslint-disable jsdoc/valid-types */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'vercel.com'],
  },
  // eslint-disable-next-line require-await
  async redirects() {
    return [
      {
        source: '/github',
        destination: 'https://github.com/steven-tey/precedent',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
