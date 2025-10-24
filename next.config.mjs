import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'foodhub';
const isDeploy = process.env.NODE_ENV === 'production';

// Detect deployment platform
// NETLIFY is set to 'true' on Netlify
// For Netlify, use no base path (root deployment)
// For GitHub Pages, use repo name as base path
const isNetlify = process.env.NETLIFY === 'true';
const publicBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (isDeploy && !isNetlify ? `/${repoName}` : '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: publicBasePath || '',
  assetPrefix: publicBasePath || undefined,
  output: 'export',

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Performance optimizations
  poweredByHeader: false, // Remove X-Powered-By header for security
  compress: true, // Enable gzip compression

  // Production optimizations
  swcMinify: true, // Use SWC for minification (faster than Terser)

  // Image optimization
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/avif', 'image/webp'], // Modern image formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Security headers (not used in static export, but kept for reference)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Security headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value:
              'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://unpkg.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https:",
              "frame-src 'self' https://www.google.com",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },

  // SASS configuration
  sassOptions: {
    includePaths: ['./src/styles'],
  },

  // Redirects and rewrites (not used in static export)
  async rewrites() {
    return [];
  },

  // Environment variables that should be available on the client
  env: {
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL ||
      'https://trinhquocthinh.github.io/foodhub',
    NEXT_PUBLIC_BASE_PATH: publicBasePath || '',
  },

  // Production source maps (disable for security, enable for debugging)
  productionBrowserSourceMaps: false,

  // Disable experimental features for static export
  // experimental: {
  //   optimisticClientCache: true,
  // },

  // TypeScript and ESLint configuration
  typescript: {
    // Dangerously allow production builds to successfully complete even if type errors exist
    ignoreBuildErrors: false,
  },
  eslint: {
    // Run ESLint during builds
    ignoreDuringBuilds: false,
  },
};

export default bundleAnalyzer(nextConfig);
