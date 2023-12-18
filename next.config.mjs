import million from 'million/compiler';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', 'images.unsplash.com', 'tailwindui.com', '1000logos.net', 'cdn.dribbble.com', 'cryptonaute.fr', 'cdn-icons-png.flaticon.com'],
    },
};

const millionConfig = {
    auto: true,
    // if you're using RSC:
    // auto: { rsc: true },
}

export default million.next(nextConfig, millionConfig); 