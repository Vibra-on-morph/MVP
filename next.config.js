/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    fontLoaders: [
      {
        loader: '@next/font/google',
        options: {
          timeout: 30000, // Increase timeout to 30 seconds
          fallback: ['system-ui', 'arial'], // Add fallback fonts
        },
      },
    ],
  },
  // Add font optimization settings
  optimizeFonts: true,
  // Configure external domains for font loading
  images: {
    domains: ['fonts.googleapis.com', 'fonts.gstatic.com'],
  },
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
