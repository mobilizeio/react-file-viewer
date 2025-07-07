// Copyright (c) 2017 PlanGrid, Inc.

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const ESLintPlugin = require('eslint-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',

  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8081/',
      'webpack/hot/dev-server',
      path.resolve(__dirname, './src/app.js'),
    ],
  },
  output: {
    path: path.resolve(__dirname, './build'),
    pathinfo: true,
    filename: 'app/js/[name].bundle.js',
    publicPath: '/',
  },
  // resolve: {
  //   modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'example_files'), 'node_modules'],
  //   extensions: ['.js', '.json', '.jsx'],
  // },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: [
      path.join(__dirname, 'node_modules')
    ],
    alias: {
      "react/jsx-dev-runtime": "react/jsx-dev-runtime.js",
      "react/jsx-runtime": "react/jsx-runtime.js"
    },
    fallback: {
      "util": require.resolve('util'),
      "path": false,
      "stream": require.resolve('stream-browserify')
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules[/\\](?!react-data-grid[/\\]lib)/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      // {
      //   test: /\.(js|jsx)$/,
      //   loader: 'eslint-loader',
      //   include: path.resolve(__dirname, 'src'),
      //   enforce: 'pre',
      // },
      {
        test: [/\.wexbim$/, /\.jpg$/, /\.docx$/, /\.csv$/, /\.mp4$/, /\.xlsx$/, /\.doc$/, /\.avi$/, /\.webm$/, /\.mov$/, /\.mp3$/, /\.rtf$/, /\.pdf$/],
        loader: 'file-loader',
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  },

  plugins: [
    new ESLintPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, './index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })

  ],
};
