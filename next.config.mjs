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
      {
        protocol: 'https',
        hostname: 'www.saboomaruti.in',
      },
      {
        protocol: 'https',
        hostname: 'www.marutisuzuki.com',
      },

      {
        protocol: 'https',
        hostname: 'images-saboomaruti-in.s3.ap-south-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
