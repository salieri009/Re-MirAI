/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Temporarily disable ESLint during builds due to circular reference issue
  // This is a known Next.js/ESLint compatibility issue
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow build to continue on type errors during development
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig




