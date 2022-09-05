/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.myanimelist.net'],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
