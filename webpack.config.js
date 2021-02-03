const path = require('path');

module.exports = {
  entry: './scripts/index.ts',
  module: {
    rules: [
      {
        test: /\.ts/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'build'),
  },
  cache: true,
  stats: {
    logging: true,
    timings: true,
    hash: true,
  },

  optimization: {
    minimize: true,
  },

  devtool: 'eval',

  mode: 'development'
}; 