/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ibb.co', 'i.ibb.co', 'velog.velcdn.com', 'ssuspot.s3.ap-northeast-2.amazonaws.com'],
  },
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
