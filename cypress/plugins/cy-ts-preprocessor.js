const wp = require('@cypress/webpack-preprocessor');

const webpackOptions = {
  resolve: {
    extensions: ['.ts', '.mjs', '.js', '.json', '.graphql', '.gql'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: [/node_modules/],
        loader: 'graphql-tag/loader',
      },
    ],
  },
};

const options = {
  webpackOptions,
};

module.exports = wp(options);
