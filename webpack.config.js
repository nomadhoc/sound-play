const path = require('path')
module.exports = {
  mode: 'production',
  entry: {
    main: path.resolve('src/index.js'),
  },

  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
}
