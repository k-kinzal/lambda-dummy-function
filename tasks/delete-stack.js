'use strict';

var stack = require('./libs/stack');

module.exports = {
  d: {
    'delete-stack': {
      message: 'Will delete a stack for Lambda of dummy',
      type: 'confirm',
      process: {
        true: [
          'aws cloudformation delete-stack --region us-east-1 --stack-name ' + stack.StackName,
          'npm config delete ' + stack.identifier,
        ]
      }
    }
  }
};