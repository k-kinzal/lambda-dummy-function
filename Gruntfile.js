'use strict';

module.exports = function (grunt) {
  // tasks
  grunt.registerTask('create-stack', function() {
    config = grunt.initConfig(grunt.util._.extend(config, require('./tasks/create-stack')));

    var stack = require('./tasks/libs/stack');
    if (!!stack.StackId) {
      grunt.log.error('You have already created a stack.');

      return;
    }

    grunt.loadNpmTasks('grunt-d');
    grunt.loadNpmTasks('grunt-template');
    grunt.task.run([
      'd:create-stack',
      'template'
    ]);

  });
  grunt.registerTask('delete-stack', function() {
    config = grunt.initConfig(grunt.util._.extend(config, require('./tasks/delete-stack')));

    var stack = require('./tasks/libs/stack');
    if (!stack.StackId) {
      grunt.log.error('You have not created a stack.');

      return;
    }

    grunt.loadNpmTasks('grunt-d');
    grunt.task.run([
      'd:delete-stack'
    ]);

  });
  grunt.registerTask('run', function() {
    config = grunt.initConfig(grunt.util._.extend(config, require('./tasks/run')));

    if (this.flags.local) {
      grunt.loadNpmTasks('grunt-lambda-runner'); 
      grunt.task.run([
        'lambda_runner'
      ]);

      return;
    }

    grunt.loadNpmTasks('grunt-lambda-upload');
    grunt.loadNpmTasks('grunt-lambda-invoke');
    grunt.loadNpmTasks('grunt-lambda-log');
    grunt.loadNpmTasks('grunt-lambda-delete');
    grunt.loadNpmTasks('grunt-wait'); 
    grunt.task.run([
      'lambda_upload',
      'lambda_invoke',
      'wait',
      'lambda_log',
      'lambda_delete'
    ]);
  });
  grunt.registerTask('debug', function() {
    config = grunt.initConfig(grunt.util._.extend(config, require('./tasks/debug')));
    grunt.loadNpmTasks('grunt-regarde');
    grunt.renameTask('regarde', 'watch');
    grunt.option('force', true); // not stop even if the test fails
    grunt.task.run([
      'watch'
    ]);
  });
  grunt.registerTask('test', function() {
    config = grunt.initConfig(grunt.util._.extend(config, require('./tasks/test')));
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test'); 
    grunt.task.run([
      'jshint',
      'mochaTest'
    ]);
  });
  grunt.registerTask('e2e', function() {
    config = grunt.initConfig(grunt.util._.extend(config, require('./tasks/e2e')));

    var stack = require('./tasks/libs/stack');
    if (!stack.StackId) {
      grunt.log.error('You have not created a stack.');

      return;
    }

    grunt.loadNpmTasks('grunt-mocha-test'); 
    grunt.loadNpmTasks('grunt-lambda-upload');
    grunt.loadNpmTasks('grunt-lambda-delete');
    grunt.option('force', true); // not stop even if the test fails
    grunt.task.run([
      'lambda_upload',
      'mochaTest',
      'lambda_delete'
    ]);
  });
  // configuration
  var config = grunt.initConfig({
    clean: {
      server: '.tmp'
    },
  });
  // load
  grunt.loadNpmTasks('grunt-contrib-clean');
};




