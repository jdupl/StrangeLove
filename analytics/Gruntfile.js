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
    },
    coffeelint:{
      models:{
        files:{
	  src:['src/models/*.coffee']
	}
      }
    }
  });

  grunt.registerTask('compile', ['coffeelint:models','coffee:models']);
  grunt.registerTask('lint', ['coffeelint:models']);

};
