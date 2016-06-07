var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Photo = mongoose.model('Photo'),
  fs = require('fs'),
  multer  = require('multer'),
  upload = multer({ dest: 'uploads/' });

module.exports = function(app) {
  app.use('/photo', router);
};

router.get('/', function(req, res, next) {
  res.render('photo');
});

router.post('/', upload.single('photo'), function(req, res, next) {
  getLocation(req.body.location, function(location) {
    findWeather(location, function(weather) {
      sendPhotoToCloudinary(req.file.path, function(storedPhoto) {
        savePhoto(req, res, next, weather, location, storedPhoto);
      });
    });
  });
});

function getLocation(location, callback) {
  var request = require('request')
  var googleKey = 'AIzaSyAcA_snFUgEV3xf49kurzJ0_ofBX8jcz5s';
  var query = location.split(' ').join('+');
  var placeSearchUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query='+query+'&key='+googleKey;

  request.get(placeSearchUrl, function(err, result, body) {
    var place = JSON.parse(body).results[0];
    callback({
      lat: place.geometry.location.lat,
      lon: place.geometry.location.lng,
      name: place.name
    });
  });
}

function findWeather(location, callback) {
  var weather = require('openweathermap');
  weather.find({lat: location.lat, lon: location.lon, appid:'a91a13009068fb6ff749849e044aa473'}, function(err, result) {
    var list = result.list[0];
    var temp = (list.main.temp * 9/5) - 459.67;
    callback({
      description: list.weather[0].description,
      temp: Math.round(temp)
    });
  });
}

function sendPhotoToCloudinary(photo, callback) {
  var cloudinary = require('cloudinary');

  cloudinary.config({
    cloud_name: 'harrythree',
    api_key: '547515639579753',
    api_secret: 'bvshoXoTEXWKWWR4Qoo_OBm0BGs'
  });

  cloudinary.uploader.upload(photo, callback);
}

function savePhoto(req, res, next, weather, location, storedPhoto) {
  var photo = new Photo({
    url: storedPhoto.url,
    message: req.body.message,
    weather: weather.description,
    temp: weather.temp,
    location: location.name
  });

  photo.save(function(err) {
    fs.unlink(req.file.path);
    if (err) {
      return next(err);
    }

    res.redirect('/');
  });
}
