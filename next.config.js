/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'ibb.co',
      'i.ibb.co',
      'velog.velcdn.com',
      'ssuspot.s3.ap-northeast-2.amazonaws.com',
      'upload.wikimedia.org',
    ],
  },
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
