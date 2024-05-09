/** @type {import('next').NextConfig} */
const {
    createVanillaExtractPlugin
} = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {
    // output: "export", // static 모드
    async rewrites() {
        return [
            {
                source: '/upload/:slug',
                destination: `${process.env.NEXT_PUBLIC_BASE_URL}/upload/:slug`
            }
        ]
    }
};

// export default nextConfig;
module.exports = withVanillaExtract(nextConfig);
