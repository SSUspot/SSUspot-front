/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ibb.co', 'i.ibb.co'],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
