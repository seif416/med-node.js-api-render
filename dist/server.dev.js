"use strict";

var express = require('express');

var mongoose = require('mongoose');

var routes = require('./routes');

var app = express();
var PORT = process.env.PORT || 3000;
var MONGODB_URI = 'mongodb+srv://seifadelelpop:ZVTQ3uIL3BkZsCa8@cluster0.uuq3ewo.mongodb.net/';
mongoose.connect(MONGODB_URI).then(function () {
  console.log('Connected to MongoDB');
  app.use(express.json());
  app.use('/api', routes);
  app.listen(PORT, function () {
    return console.log('Server is running on port 3000');
  });
})["catch"](function (err) {
  return console.error('Error connecting to MongoDB:', err);
});