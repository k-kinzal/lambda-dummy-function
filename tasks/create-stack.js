'use strict';

var path = require('path');
var stackName = require('./libs/name');
var stack = require('./libs/stack');

module.exports = {
  d: {
    'create-stack': {
      message: 'Will create a stack for Lambda of dummy',
      type: 'confirm',
      process: {
        true: [
          'aws cloudformation create-stack --region us-east-1 --stack-name ' + stackName + ' --template-body file://templates/lambda.json --capabilities CAPABILITY_IAM',
          'wait test `aws cloudformation describe-stacks --region us-east-1 --stack-name ' +  stackName + ' | jq -r ".Stacks[0].StackStatus"` = "CREATE_COMPLETE" ',
          'npm config set ' + stack.identifier + ' "`aws cloudformation describe-stacks --region us-east-1 --stack-name ' +  stackName + ' | jq -c ".Stacks[0]"`"',
        ]
      }
    }
  },
  template: {
    cloudformation: {
      options: {
        data: function() {
          // regenerate stack
          delete(require.cache[path.resolve('tasks/libs/stack.js')]);
          return require('./libs/stack');
        }
      },
      files: {
        'config/local.json': [
          'config/local.json.template'
        ]
      }
    }
  },
};