require('rootpath')()
const logger = require('server/utils/logger')
const { sequelize } = require('../../src/models')

const VALID_TEST_HOSTS = ['localhost', '127.0.0.1']
const LOG_SCOPE = { scope: 'db' }

// entity names to delete
const entities = []

const deleteTables = (host, tables) => sequelize.transaction(transaction => tables.reduce((promise, entity) => {
  logger.info(`Deleteing Table ${entity} from Database ${host}`, LOG_SCOPE)
  return promise.then(() => sequelize.query(`delete from '${entity}';`, { transaction, raw: true }))
}, Promise.resolve()))

const deleteDatabase = () => {
  const testHost = sequelize.config.host
  if (!VALID_TEST_HOSTS.includes(testHost)) {
    logger.warn(`Database test host is pointing to ${testHost} instead of localhost. Delete is disabled.`, LOG_SCOPE)
    return Promise.resolve()
  }
  logger.info(`Clearing Database ${testHost}`, { scope: 'db' })
  // sequential promise chaining to preserve entity deletion order (dependant FKs)
  return deleteTables(testHost, entities)
    .then(() => logger.info(`Tables ${entities.join(',')} deleted successfully`, LOG_SCOPE))
    .catch(err => logger.error(`Failed to delete database`, err, LOG_SCOPE))
}

module.exports = {
  deleteDatabase
}
