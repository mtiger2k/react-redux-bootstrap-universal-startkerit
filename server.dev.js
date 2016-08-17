var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var port = process.env.PORT || 8080;
var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo:true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static(path.join(__dirname, "assets")));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'assets','index.html'));
});

app.listen(port, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:'+port);
});

