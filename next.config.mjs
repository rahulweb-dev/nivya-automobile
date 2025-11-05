// next.config.mjs
import withBundleAnalyzer from '@next/bundle-analyzer';

const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
      {
        protocol: 'https',
        hostname: 'www.broaddcast.com',
      },
      {
        protocol: 'https',
        hostname: 'marutistoragenew1.azureedge.net',
      },
      {
        protocol: 'https',
        hostname: 'az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net',
      },
      {
        protocol: 'https',
        hostname: 'imgd.aeplcdn.com',
      },
       {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },

      
    ],
  },
};

export default analyzer(nextConfig);
