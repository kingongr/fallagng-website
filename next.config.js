/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Trust host header from ngrok/proxy
  experimental: {
    trustHostHeader: true,
  },
  images: {
    remotePatterns: [],
    unoptimized: false,
    // Allow missing images to fail gracefully
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    // CSP removed - Next.js handles security headers automatically
    // The previous CSP was blocking all JavaScript execution
  },
}

module.exports = nextConfig

