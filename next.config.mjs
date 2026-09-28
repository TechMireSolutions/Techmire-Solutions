/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  transpilePackages: ['styled-components'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
