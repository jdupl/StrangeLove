module.exports = function(grunt){
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  require('time-grunt')(grunt);

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
    },
    watch:{
      models:{
        files:'src/models/*.coffee',
	tasks:['coffeelint:models', 'coffee:models']
      }
    }
  });

  grunt.registerTask('compile', ['watch:models']);

};
