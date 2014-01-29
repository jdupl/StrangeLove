module.exports = function(grunt){
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    coffee:{
      models:{
        files:[{
	  expand:true,
	  cwd:'src/models/',
	  src:['*.coffee'],
	  dest:'dev/models/',
	  ext:'.js'
	}]
      }
    }
  });

  grunt.registerTask('compile', ['coffee:models']);
};
