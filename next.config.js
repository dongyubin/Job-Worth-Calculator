/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'i.pravatar.cc'],
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = nextConfig