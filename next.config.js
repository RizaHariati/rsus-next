/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: process.env.NODE_ENV === "production" ? "export" : "standalone",
  reactStrictMode: true,

  // crossOrigin: "use-credentials",
  images:
    process.env.NODE_ENV === "production"
      ? {
          loader: "custom",
          loaderFile: "./loader.ts",
          path: "https://rsuripsumoharjo-model.netlify.app/",
          domains: ["cdn.sanity.io", "rsuripsumoharjo-model.netlify.app"],
        }
      : {
          loader: "default",
          domains: ["cdn.sanity.io", "rsuripsumoharjo-model.netlify.app"],
        },

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
};

module.exports = nextConfig;
