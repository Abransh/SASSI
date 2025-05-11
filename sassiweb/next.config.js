/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "drive.google.com",
      "lh3.googleusercontent.com",
      "lh4.googleusercontent.com",
      "lh5.googleusercontent.com",
      "lh6.googleusercontent.com",
      "ucarecdn.com",
      "sassimilan.com",
      "uploadcare.com",
    ],
    remotePatterns: [{
      protocol: 'https',
      hostname: 'drive.google.com',
      pathname: '/**',
    }, ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "sassiweb.vercel.app"],
    },
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/dist/**', '**/node_modules/**'],
    };
    return config;
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: [{
          key: 'Content-Security-Policy',
          value: `
            default-src 'self';
            script-src 'self' 'unsafe-inline' 'unsafe-eval' https://ucarecdn.com https://uploadcare.com https://js.stripe.com https://maps.googleapis.com https://cdn.tiny.cloud https://*.uploadcare.com;
            style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
            img-src 'self' data: blob: https://*.uploadcare.com https://maps.gstatic.com https://maps.googleapis.com;
            font-src 'self' https://fonts.gstatic.com;
            connect-src 'self' https://api.uploadcare.com https://maps.googleapis.com;
            frame-src 'self' https://www.google.com;
            media-src 'self';
          `.replace(/\s+/g, ' ').trim()
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        }
      ]
    }]
  },
  // Add Uploadcare script to the page
  async rewrites() {
    return [
      {
        source: '/uploadcare-widget.js',
        destination: 'https://ucarecdn.com/libs/widget/3.x/uploadcare.full.min.js',
      },
    ];
  },
};

export default nextConfig;