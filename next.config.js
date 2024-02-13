/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['images.unsplash.com', 'res.cloudinary.com', 'tailwindui.com', 'lkhayewnehhxhqkckehs.supabase.co'],
    },
}

module.exports = nextConfig
