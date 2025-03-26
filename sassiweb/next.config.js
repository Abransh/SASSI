/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Exclude dist directories from page resolution
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  },
    images: {
      domains: [
        'example.com',
        'res.cloudinary.com',
        'images.unsplash.com',
        'via.placeholder.com',
        'placehold.co',
        'placekitten.com'
      ],
    },
    webpack: (config) => {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ['**/dist/**', '**/node_modules/**'],
      };
      return config;
    },
  };
  
  export default nextConfig;