module.exports = function(grunt){
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint:{
      all: ['Gruntfile.js', 'app.js']
    },
    forever:{
      options:{
	index:'app.js',
	logDir:'logs'
      }
    }
  });

  grunt.registerTask('deploy', ['forever:start']);
  grunt.registerTask('lint', ['jshint']);
};
