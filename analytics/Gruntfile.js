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
      },
      tests:{
         files:[{
	   expand:true,
	   cwd:'src/tests/',
	   src:['*.coffee'],
	   dest:'dev/tests/',
	   ext:'.js'
	 }]
      }
    },
    coffeelint:{
      models:{
        files:{
	  src:['src/models/*.coffee']
	}
      },
      tests:{
        files:{
	  src:['src/tests/*.coffee']
	}
      }
    },
    watch:{
     src:{
      files:['src/**/*.coffee'],
      tasks:['concurrent:coffeelint', 'concurrent:compile']
     }
    },
    concurrent:{
      coffeelint:['coffeelint:models', 'coffeelint:tests'],
      compile:['coffee:models', 'coffee:tests']
    }
  });

  grunt.registerTask('compile', ['concurrent:coffeelint', 'concurrent:compile', 'watch:src']);

};
