module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-travis-matrix');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-simple-istanbul');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadTasks('tasks');

  grunt.initConfig({
    mochaTest: {
      options: {
        reporter: 'spec',
        ui: 'mocha-given',
        require: ['should', 'should-sinon', 'coffee-script/register']
      },
      test: {
        src: ['test/**/*.coffee']
      }
    },
    travisMatrix: {
      v4: {
        test: function() {
          return /^v4/.test(process.version);
        },
        tasks: ['istanbul:unit', 'shell:codeclimate']
      }
    },
    shell: {
      codeclimate: 'npm run codeclimate'
    },
    istanbul: {
      unit: {
        options: {
          root: 'tasks',
          dir: 'coverage',
          simple: {
            cmd: 'cover',
            args: ['grunt', 'mocha'],
            rawArgs: ['--', '--color']
          }
        }
      }
    },
    eslint: {
      tasks: {
        options: {
          configFile: '.eslint.json',
          format: 'node_modules/eslint-codeframe-formatter'
        },
        src: ['tasks/**/*.js']
      }
    },
    open: {
      coverage: {
        path: 'coverage/lcov-report/index.html'
      }
    },
    neo4j: {
      start: {
        debug: true
      }
    }
  });

  grunt.registerTask('mocha', ['mochaTest:test']);
  grunt.registerTask('default', ['eslint:tasks', 'mocha']);
  grunt.registerTask('coverage', ['istanbul:unit', 'open:coverage']);
  grunt.registerTask('ci', ['eslint:tasks', 'mocha', 'travisMatrix']);
};
