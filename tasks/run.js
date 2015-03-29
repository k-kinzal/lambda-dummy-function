'use strict';

var packages = require('../package.json')
var stack = require('./libs/stack');
var functionName = require('./libs/name');

// set config
module.exports = {
  lambda_runner: {
    options: {
      functionName: functionName,
      handler: 'src/index.js',
      event: 'test/fixtures/debug.json'
    }
  },
  lambda_upload: {
    options: {
      functionName: functionName,
      handler: 'src/index.handler',
      mode: 'event',
      role: stack.ExecuteRoleArn,
      runtime: 'nodejs',
      description: packages.description,
      memorySize: 128,
      timeout: 60,
      credentials: {
        profile: null
      }
    },
    debug: {
      files: [{
        src: require('./libs/nodeModulePaths').concat([
          'src/*.js',
          'config/default.json',
          'config/local.json'
        ])
      }]
    }
  },
  lambda_invoke: {
    options: {
      functionName: functionName,
      event: 'test/fixtures/debug.json'
    },
    debug: {}
  },
  lambda_log: {
    options: {
      functionName: functionName,
      startTime: require('./libs/timestamp'),
      tail: true,
      firstLogOnly: true
    },
    debug: {}
  },
  lambda_delete: {
    options: {
      functionName: functionName,
    },
    debug: {}
  },
  wait: {
    options: {
      delay: 3000
    },
    pause: {}
  }
};