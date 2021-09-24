// next.config.js
const path = require('path');

module.exports = {
  esModule: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'assets', 'styles')],
  },
  images: {
    domains: ['umbradex.vercel.app', 'raw.githubusercontent.com'],
  },
};
