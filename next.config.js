// next.config.js
const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'assets', 'styles')],
  },
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          { key: 'Content-Type', value: 'application/manifest+json' },
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'umbradex.vercel.app' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
    ],
  },

  webpack: (config, options) => {
    const { isServer, defaultLoaders } = options;

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
          options: {
            titleProp: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      convertPathData: false,
                      removeViewBox: false,
                    },
                  },
                },
                {
                  name: 'removeDimensions',
                  params: true,
                },
                {
                  name: 'prefixIds',
                  params: true,
                }
              ],
            },
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    });

    return config;
  },
};
