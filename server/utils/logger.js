const Bristol = require('bristol').Bristol
const palin = require('palin')

const logger = new Bristol()

module.exports = logger

module.exports.init = (env) => {
  if (env === 'local' || env === 'test') {
    logger.addTarget('console').withFormatter(palin).withLowestSeverity('debug')
  } else {
    logger
      .addTarget('file', {file: 'server.log'})
      .withFormatter('commonInfoModel')
      .withLowestSeverity(env === 'prd' ? 'info' : 'debug')
  }
}
