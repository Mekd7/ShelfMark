/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // For your Goodreads images (kept from your original config)
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'images.gr-assets.com',
        pathname: '/books/**',
      },
      // For Bing images (new patterns)
      {
        protocol: 'https',
        hostname: 'tse*.mm.bing.net',
        pathname: '/th/id/**',
      },
      {
        protocol: 'https',
        hostname: 'th.bing.com',
        pathname: '/th/id/**',
      },
    ],
    // Optional: Add these if you want to allow any image from these domains
    domains: [
      'tse1.mm.bing.net',
      'tse2.mm.bing.net',
      'tse3.mm.bing.net',
      'tse4.mm.bing.net',
      'th.bing.com'
    ],
  },
};

module.exports = nextConfig;