/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['drive.google.com', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/dist/**', '**/node_modules/**'],
    };
    return config;
  },
};

export default nextConfig;