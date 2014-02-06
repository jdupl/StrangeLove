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
      all:{
        
      },
      models:{
        files:{
	  src:['src/models/*.coffee']
	},
	options:{
	  'no_trailing_whitespace':{
	    'level':'ignore'
	  }
	}
      },
      tests:{
        files:{
	  src:['src/tests/*.coffee']
	},
        options:{
	  'no_trailing_whitespace':{
	    'level':'ignore'
	  }
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
    },
    docco:{
      src:{
        src:['src/**/*.coffee'],
	options:{
	  output: 'docs/'
	}
      }
    }
  });

  grunt.registerTask('compile', ['watch:src']);
  grunt.registerTask('doc', ['docco:src']);

};
