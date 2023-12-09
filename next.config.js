/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['ibb.co', 'i.ibb.co'],
  },
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
