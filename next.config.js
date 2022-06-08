/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // NEXT_PUBLIC_HOST: 'http://localhost:3000',
    NEXT_PUBLIC_HOST: 'https://next-food-ordering-omega.vercel.app/',
    NEXT_PUBLIC_USERNAME: 'admin',
    NEXT_PUBLIC_PASSWORD: 123456,
    NEXT_PUBLIC_TOKEN: 'SWdw4Cv||663Z{p3ZXtp%k42sfjj4f'
  },
  images: {
    domains: ['res.cloudinary.com']
  }
};

module.exports = nextConfig
