/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
     images: {
        domains: ["api.fostech.vn"]
    },
}

module.exports = nextConfig
