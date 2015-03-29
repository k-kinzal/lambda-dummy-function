'use strict';

var Promise = require('bluebird');
var AWS     = require('aws-sdk');
var assert  = require('assert');
var path    = require('path');
var LambdaLogsStream = require('lambda-logs');

var lambda       = Promise.promisifyAll(new AWS.Lambda());
var logs         = Promise.promisifyAll(new AWS.CloudWatchLogs());
var fixture      = require(path.resolve('./test/fixtures/debug'));
var functionName = process.env.functionName;

describe('Lambda entry point:', function() {

  it('should call to success', function(done) {
    var startTime = Math.floor(new Date().getTime() / 1000);
    var params = {
      FunctionName: functionName,
      InvokeArgs: JSON.stringify(fixture)
    };
    lambda.invokeAsyncAsync(params).delay(1000).then(function() {
      var logs = new LambdaLogsStream();
      var stream = logs.describe(functionName, startTime);
      var dispose = stream.onValue(function(message) {
        if (message.type !== 'message') {
          return;
        }

        assert.equal(JSON.stringify(JSON.parse(message.text)), JSON.stringify(fixture));

        stream.stop();
        dispose();
        done();
      });
      stream.onError(function(err) {
        stream.stop();
        throw err;
      });

    });
  });

});
