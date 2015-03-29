'use strict';

var packages = require('../package.json')
var stack = require('./libs/stack');
var functionName = require('./libs/name');

process.env.functionName = functionName;

module.exports = {
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
  lambda_delete: {
    options: {
      functionName: functionName,
    },
    debug: {}
  },
  mochaTest: {
    options: {
      timeout: 100000,
    },
    test: {
      src: ['test/e2e/*.spec.js']
    }
  }
};