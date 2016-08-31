'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './source/client/index'
  ],
  output: {
    path: path.join(__dirname, 'assets'),
	publicPath: "/assets/",
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify('development')
      }
    }),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'source')
    },
     {
       test: /\.(jpe?g|png|gif|svg)$/,
       loader: 'file-loader?name=[name].[ext]'
     }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
	root: path.resolve(path.join(__dirname, 'source')),
  }
};

