'use strict';

var path = require('path');

var packages = require('../../package.json');
var name     = packages.name;

module.exports = name + require('./timestamp');