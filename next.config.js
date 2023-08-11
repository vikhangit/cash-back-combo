/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
     images: {
        domains: ["api.fostech.vn", "combohoantien.goodcharme.vn"]
        path: '/_next/image'
    },
}

module.exports = nextConfig
