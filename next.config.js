/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*"
          },
          {
          key: "Access-Control-Allow-Methods",
          value: "GET, POST, PATCH, PUT, DELETE, OPTIONS"
          },
          {
          key: "Access-Control-Allow-Headers",
          value: "authorization, x-client-info, apikey, content-type"
          },
          {
          key: "Access-Control-Allow-Credentials",
          value: "true"
          }
        ]
      }
    ]
  }
};

module.exports = nextConfig;
