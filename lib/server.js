var express = require('express');
var app = express();
//var webrender = require('./app');

module.exports = {
  start: function (url, port, onUrlChange) {
    url = url || '/' + url;
    port = port || '3000';
    onUrlChange = onUrlChange || function () {};
    var example = 'http://localhost:' + port + '/' + url;

    app.get('/', function (req, res) {
      res.send('Change URL: example - <a href="' + example + '">' + example + '</a>');
    });

    app.use(function (req, res, next) {
      var url = req.originalUrl.replace('/', '');
      console.log('Request: ', url);
      onUrlChange(url, req, res, next);
    });

    app.listen(port);

    console.log('Server running at: http://localhost:' + port);
  }
};
