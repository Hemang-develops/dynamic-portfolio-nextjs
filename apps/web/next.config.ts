/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    "/page": ["./content/site-content.json"],
  },
};

module.exports = nextConfig;
