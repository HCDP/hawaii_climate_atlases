/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // If NEXT_PUBLIC_BASE_PATH is set use specified, otherwise use root
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',

  // for dev allows you to run http://evapotranspiration.geography.hawaii.edu:3000/
  allowedDevOrigins: ['evapotranspiration.geography.hawaii.edu']
};

export default nextConfig;
