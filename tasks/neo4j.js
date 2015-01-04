var cli = require('simple-cli');

module.exports = function(grunt) {
  grunt.registerTask('neo4j', 'A simple API for using neo4j via grunt', function() {
    cli.spawn(grunt, this, 'neo4j', this.async());
  });
};
