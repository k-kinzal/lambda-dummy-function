'use strict';
/**
 * AWS Lambda entry point
 *
 * @param {Object} event lambda event object
 * @param {Object} context lambda context
 */
exports.handler = function(event, context) {
  console.log(JSON.stringify(event));

  context.done(null);
};