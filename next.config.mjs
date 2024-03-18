/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        OPENWEATHER_SECRET: process.env.OPENWEATHER_SECRET, // pulls from .env file
        OPENCAGE_API_KEY: process.env.OPENCAGE_API_KEY,
    }
};

export default nextConfig;
