/** @type {import('next').NextConfig} */
const nextConfig = {
    publicRuntimeConfig: {
        applicationName: process.env.APPLICATION_NAME || 'TBD',
        publicContactEmail: process.env.PUBLIC_CONTACT_EMAIL || 'm@f-a.nz',
        baseUrl: process.env.BASE_URL || 'http://localhost:1323',
    },
    images: {
        remotePatterns: [
        {
            protocol: 'https',
            hostname: 'via.placeholder.com',
        },
        {
            hostname: 'localhost',
        },
    ],
  },
}

module.exports = nextConfig
