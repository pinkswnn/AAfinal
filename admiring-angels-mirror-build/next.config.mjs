/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif','image/webp'],
  },
  experimental: {
    serverActions: { allowedOrigins: [] },
  },
};
export default nextConfig;
