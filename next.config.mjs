/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        OPENWEATHER_SECRET: process.env.OPENWEATHER_SECRET, // pulls from .env file
    }
};

export default nextConfig;
