/** @type {import('next').NextConfig} */
const nextConfig = {
    // allowedDevOrigins: [
    //     'staging-crm-frontend.vsqdev.com',
    //     'member.vsquareclinic.com',
    // ],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'profile.line-scdn.net',
                port: '',
                pathname: '**',
            },
        ],
    },
    // devIndicators: {
    //     allowedDevOrigins: ["https://*.ngrok-free.app"],
    // },
    // ปิด development indicators ทั้งหมด (ไม่แสดง icon ใดๆ)
    devIndicators: false,
};

export default nextConfig;
