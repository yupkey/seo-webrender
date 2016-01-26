var express = require('express');
var app = express();
var webrender = require('./app');

app.get('/', function (req, res) {
  res.send('Get page example - <a href="http://localhost:3000/http://facebook.com">http://localhost:3000/http://facebook.com</a>');
});

app.use(function (req, res, next) {
  var url = req.originalUrl.replace('/', '');
  console.log('Request: ', url);
  webrender.get(url, function (data) {
    res.send(data.source);
    next();
  }, function (err) {
    res.send(err);
    next();
  });
});

app.listen(3000);

console.log('Server running at: http://localhost:3000');
