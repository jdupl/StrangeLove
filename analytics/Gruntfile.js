module.exports = function(grunt){
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    jshint:{
      all: ['Gruntfile.js', 'app.js', 'test/*', 'package.json'],
      options:{
        "smarttabs": true
      }
    },
    watch:{
      lint:{
        files: ['app.js', 'test/*'],
        tasks: ['jshint']
      },
      test:{
        files: ['test/*.js'],
	tasks: ['jshint','mochaTest']
      }
    },
    mochaTest:{
      test: {
        options: {
          reporter: 'spec',
        },
        src: ['test/**/*.js']
      }
    }
  });

  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('watch-lint', ['watch:lint']);
  grunt.registerTask('watch-test', ['watch:test']);
  grunt.registerTask('test', ['mochaTest']);


};
