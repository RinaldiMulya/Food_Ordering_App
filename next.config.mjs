/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGO_URI: process.env.MONGO_URI,
    },
    dev: {
        https: false,
      },
};

export default nextConfig;
