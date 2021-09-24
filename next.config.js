// next.config.js

module.exports = {
  esModule: true,
  sassOptions: {
    includePaths: "./src/assets/styles",
  },
  images: {
    domains: ['umbradex.vercel.app', 'raw.githubusercontent.com'],
  },
};
