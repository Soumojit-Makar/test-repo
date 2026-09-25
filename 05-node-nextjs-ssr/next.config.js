/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow running on any PORT env variable
  env: {
    PORT: process.env.PORT || '3000',
  },
};

module.exports = nextConfig;
