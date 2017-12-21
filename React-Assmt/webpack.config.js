'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var rootPath = path.join(__dirname);


function BuildCompletionNotifyPlugin() {
};

BuildCompletionNotifyPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function(stats) {
    console.log(' Build process done!!!');
  });
};


module.exports = {
  entry: {
    prelogin: path.join(rootPath, 'src/js/modules/prelogin/route'),
  },
  output: {
    path: path.join(rootPath, '/dist/'),
    filename: '[name]-[hash].min.js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/html/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
      chunks: ['prelogin']
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new OptimizeCssAssetsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: true,
      compress: {
        screw_ie8: true
      }
    }),
    new StatsPlugin('stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new BuildCompletionNotifyPlugin(),
    new CopyWebpackPlugin([
        { from: path.join(rootPath,'src/static/images'), to: 'assets/image' },
        { from: path.join(rootPath,'src/static/files'), to: 'assets/file' }
    ])
  ],
  resolve: {
    alias: {
        config$: path.join(rootPath, 'config', process.env.NODE_ENV)
    },
    extensions: ['.js', '.json', '.css']
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
          publicPath: "/"
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|pdf|ico)$/,
        loader: 'file-loader?name=[path][name].[ext]?[hash]',
        query: {
          useRelativePath: process.env.NODE_ENV === "production"
        }
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            'css-loader',
            'sass-loader' // compiles Sass to CSS]
          ],
          publicPath: "/"
        })
      }
    ]
  }
};
