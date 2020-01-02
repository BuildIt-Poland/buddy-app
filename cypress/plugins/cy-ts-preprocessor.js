const wp = require('@cypress/webpack-preprocessor');

const webpackOptions = {
  resolve: {
    extensions: ['.ts', '.mjs', '.js', '.json', '.graphql'],
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
      { test: /\.graphql?$/, loader: 'webpack-graphql-loader' },
    ],
  },
};

const options = {
  webpackOptions,
};

module.exports = wp(options);
