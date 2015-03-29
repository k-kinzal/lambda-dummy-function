'use strict';

module.exports = {
  jshint: {
    options: {
      jshintrc: '.jshintrc',
      reporter: require('jshint-stylish')
    },
    all: [
      'src/*.js'
    ]
  },
  mochaTest: {
    test: {
      src: ['test/unit/*.spec.js']
    }
  }
};