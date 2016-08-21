var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');
var proxy = require('express-http-proxy');
require('dotenv').config();

const setupApp = (app) => {
  app.use('/api', proxy('http://localhost:'+process.env.API_PORT, {
    forwardPath: function(req, res) {
      console.log("proxy url: " + require('url').parse(req.url).path);
      return require('url').parse(req.url).path;
    }
  }));
}

new WebpackDevServer(webpack(config), {
  contentBase: './assets',
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  setup: function(app) {
    setupApp(app);
  }
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/');
});
