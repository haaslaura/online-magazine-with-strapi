import type { NextConfig } from 'next';

const strapiUrl = new URL(process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:3000');
const isLocalHost = ['localhost', '127.0.0.1', '0.0.0.0'].includes(strapiUrl.hostname);

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: strapiUrl.protocol.slice(0, -1) as 'http' | 'https',
                hostname: strapiUrl.hostname,
                port: strapiUrl.port,
                pathname: '/uploads/**',
            },
        ],
        dangerouslyAllowLocalIP: isLocalHost,
    },
};

export default nextConfig;
