'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var rootPath = path.join(__dirname);

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    prelogin: [
      path.join(rootPath, 'src/js/modules/prelogin/route.js'),
      'webpack/hot/only-dev-server',
      'webpack-dev-server/client?http://localhost:3000'
    ]
  },
  output: {
    path: path.join(rootPath, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    hot: true,
    inline: true,
    open:true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/html/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
      chunks: ['prelogin']
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new CopyWebpackPlugin([
        { from: path.join(rootPath,'src/static/images'), to: 'assets/image' },
        { from: path.join(rootPath,'src/static/files'), to: 'assets/file' }
    ])
  ],
  resolve: {
    alias: {
        config$: path.join(rootPath, 'config', process.env.NODE_ENV)
    },
    extensions: ['.js', '.json','.css']
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: [/node_modules/,/vendor/],
        loader: 'eslint-loader'
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: [/*'react-hot-loader', */'babel-loader']
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|pdf|ico)$/,
        loader: 'file-loader',
        query: {
          useRelativePath: process.env.NODE_ENV === 'production'
        }
      },
      {
        test: /\.sass$/,
        use: [
            'style-loader', // creates style nodes from JS strings
            'css-loader', // translates CSS into CommonJS
            'sass-loader' // compiles Sass to CSS]
          ]
      }
    ]
  }
};
