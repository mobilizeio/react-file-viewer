// Copyright (c) 2017 PlanGrid, Inc.

process.env.NODE_ENV = 'development';
process.on('unhandledRejection', err => {
  throw err;
});

const PORT = 8081;

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config.dev.js');

const compiler = webpack(config);

const devServerOptions = {
  hot: true,
  static: config.output.publicPath,
  watchFiles: {
    options: {
      ignored: /node_modules/,
    },
  },
  port: PORT,
};

const devServer = new WebpackDevServer(devServerOptions, compiler);

devServer.start().then(() => {
  console.log('Development server listening on port ', PORT);
}).catch(err => {
  console.log(err);
});
