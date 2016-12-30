spawn = require('child_process').spawn

describe 'integration', ->
  Given -> @output = ''
  When (done) ->
    child = spawn('grunt', ['neo4j'])
    child.stdout.on 'data', (data) =>
      @output += data.toString()
    child.on 'close', => done()
  Then -> @output.should.match(/Command: neo4j start/)
