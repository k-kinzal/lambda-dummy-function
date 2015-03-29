'use strict';

var uuid = require('uuid');
var exec = require('child_process').execSync;

var packages = require('../../package.json');
var name     = packages.name.replace(/[^a-zA-Z0-9]/g, '');

// generate identifier
var identifierKey = 'projectIdentifier' + name;
var identifierEnvKey = 'npm_config_' + identifierKey;
var identifier = process.env[identifierEnvKey];

if (!identifier) {
  identifier = name + uuid.v4().replace(/[^a-zA-Z0-9]/g, '');;

  exec('npm config set ' + identifierKey + ' ' + identifier);
}

// load npm conifg
var stackEnvKey = 'npm_config_' + identifier;
var stack = (exec('npm config get ' + identifier) + '').replace(/^[\n\r"']*|[\n\r"']*$/g, '');
stack = stack !== 'undefined' ? stack : undefined;
if (stack) {
  stack = JSON.parse(stack);

  stack.Outputs.forEach(function(output) {
    stack[output.OutputKey] = output.OutputValue;
  });

  stack.identifier = identifier;
}

module.exports = stack || { identifier: identifier };