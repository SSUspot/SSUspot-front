/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['picsum.photos', 'upload.wikimedia.org', 'www.visitbusan.net'],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
