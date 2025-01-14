/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "img.icons8.com",
      "andikauploader.s3.us-east-1.amazonaws.com",
      "avatar.iran.liara.run",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
