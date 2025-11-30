// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export', // optional, Next.js 14+
// };

// module.exports = nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // disable Turbopack for production
  },
  reactStrictMode: true,
}

module.exports = nextConfig
