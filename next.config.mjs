/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  unoptimized: true,
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
