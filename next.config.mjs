/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.skyautomobiles.in',
      },
      {
        protocol: 'https',
        hostname: 'www.grouplandmark.in',
      },
        {
        protocol: 'https',
        hostname: 'www.varunmaruti.com',
      },
      
    ],
  },
};

export default nextConfig;
