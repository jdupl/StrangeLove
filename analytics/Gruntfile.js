module.exports = function(grunt){
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint:{
      all: ['Gruntfile.js', 'app.js']
    },
    watch:{
      lint:{
       files: ['app.js'],
       tasks: ['jshint']
      }
    }
  });

  grunt.registerTask('deploy', ['forever:start']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('watch-lint', ['watch:lint']);

};
