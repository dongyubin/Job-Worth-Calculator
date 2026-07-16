const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    domains: ['localhost', 'i.pravatar.cc'],
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = withMDX(nextConfig)
