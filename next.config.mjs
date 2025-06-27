/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  staticPageGenerationTimeout: 0,
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
