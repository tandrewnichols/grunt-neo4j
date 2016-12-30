sinon = require('sinon')

describe 'neo4j', ->
  Given -> @cli = sinon.stub()
  When -> @subject = require('proxyquire').noCallThru() '../tasks/neo4j',
    'simple-cli': @cli

  Then -> @cli.should.have.been.calledWith 'neo4j'
