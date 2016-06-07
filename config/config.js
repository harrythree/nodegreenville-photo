var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

require("dotenv").config({silent:true});

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'nodegreenville-photos'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/nodegreenville-photos-dev'
  },

  test: {
    root: rootPath,
    app: {
      name: 'nodegreenville-photos'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/nodegreenville-photos-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'nodegreenville-photos'
    },
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI
  }
};

module.exports = config[env];
