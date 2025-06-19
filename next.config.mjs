/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com',
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/webhook',
        destination: '/api/webhook',
      },
    ];
  },
};

export default nextConfig;
