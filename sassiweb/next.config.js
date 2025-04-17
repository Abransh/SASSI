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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/**',
      },
    ],
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
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self' https://ucarecdn.com https://uploadcare.com https://js.stripe.com https://api.stripe.com https://checkout.stripe.com;
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://ucarecdn.com https://uploadcare.com https://js.stripe.com;
              style-src 'self' 'unsafe-inline' https://ucarecdn.com https://uploadcare.com https://checkout.stripe.com;
              img-src 'self' blob: data: https://ucarecdn.com https://sassimilan.com https://uploadcare.com https://*.stripe.com;
              media-src 'self' blob: https://ucarecdn.com https://uploadcare.com;
              connect-src 'self' https://ucarecdn.com https://uploadcare.com https://api.uploadcare.com https://api.stripe.com;
              frame-src 'self' https://ucarecdn.com https://uploadcare.com https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com;
              font-src 'self' data:;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'none';
              upgrade-insecure-requests;
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
      }
    ]
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