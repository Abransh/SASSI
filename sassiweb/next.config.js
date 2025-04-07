/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Exclude dist directories from page resolution
   
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        },
        {
          protocol: 'https',
          hostname: 'drive.google.com',
          pathname: '**',
        },
      ], 
      domains: [
        'example.com',
        'res.cloudinary.com',
        'images.unsplash.com',
        'via.placeholder.com',
        'placehold.co',
        'placekitten.com',
        'drive.google.com'
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