/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // If NEXT_PUBLIC_BASE_PATH is set use specified, otherwise use root
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

export default nextConfig;
