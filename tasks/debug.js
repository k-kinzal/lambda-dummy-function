'use strict';

module.exports = {
  watch: {
    debug: {
      files: [
        'src/*.js',
        'test/*.spec.js'
      ],
      tasks: ['test']
    }
  }
};