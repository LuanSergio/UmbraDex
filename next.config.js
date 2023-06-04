// next.config.js
const path = require('path');

module.exports = {
  esModule: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'assets', 'styles')],
  },
  distDir: './dist',
  images: {
    domains: ['umbradex.vercel.app', 'raw.githubusercontent.com'],
  },
  webpack: (config, { defaultLoaders }) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [path.resolve(__dirname, "./src")],
      use: [defaultLoaders.babel],
    });
    
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: { titleProp: true },
        },
      ],
    });

    return config;
  },
};
