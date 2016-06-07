var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Photo = mongoose.model('Photo');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  Photo.find(function (err, photos) {
    if (err) return next(err);
    res.render('index', {
      title: 'NodeGreenville Photos',
      photos: photos
    });
  });
});
