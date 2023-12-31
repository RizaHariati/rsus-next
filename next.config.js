/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // experimental: {
  //   serverActions: true,
  // },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },

          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, cache,",
          },
          // {
          //   key: "Authorization",
          //   value:
          //     "Bearer skOuTPWYzAeqk7ISYYWNtxpmhpbzmmDh1e1VZPLA1VWpSGufmcHLXtbSwrgHRboQu706ofMkRfApPVF2nUMEAnkaKu3lsuvnDDQTSuALJ7DmuXL3zUVOcn8ei1UjgDKnDGHUv8iDSCdH4RwDXTUFbVZaIuosoguVI9lJCt5gxjbsc16u0zgb",
          // },
        ],
      },
    ];
  },
  // output: process.env.NODE_ENV === "production" ? "export" : "standalone",
  reactStrictMode: true,
  // experimental: {
  //   serverActions: true,
  // },
  compiler: {
    styledComponents: true,
  },
  crossOrigin: "use-credentials",
  images:
    process.env.NODE_ENV === "production"
      ? {
          loader: "custom",
          loaderFile: "./loader.ts",
          path: "https://rsus-api.vercel.app",
          domains: [
            "cdn.sanity.io",
            "rsuripsumoharjo-model.netlify.app",
            "rsus-api.vercel.app",
          ],
        }
      : {
          loader: "default",
          remotePatterns: [
            {
              protocol: "https",
              hostname: "cdn.sanity.io",
              pathname: "**",
            },
            {
              protocol: "https",
              hostname: "rsuripsumoharjo-model.netlify.app",
              pathname: "**",
            },
            {
              protocol: "https",
              hostname: "rsus-api.vercel.app",
              pathname: "**",
            },
          ],
        },

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
};

module.exports = nextConfig;
