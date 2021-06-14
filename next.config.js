// next.config.js
const withImages = require('next-images');

module.exports = withImages({
  esModule: true,
  sassOptions: {
    includePaths: "./src/assets/styles",
  },
});
