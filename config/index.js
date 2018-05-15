const dotenv = require('dotenv')
const configVars = require('../server/config-vars')
const logger = require('../server/utils/logger')

if (process.env.npm_lifecycle_event === 'dev') {
  dotenv.config({ silent: true })
}

const commonRequiredVars = [
  'NODE_ENV',
  'API_PORT',
  'API_TIMEOUT'
]

const additionalRequiredVars = [
  'DB_POOL_SIZE', 'DB_CONNECTION_IDLE', 'sequelize_db'
]

const requiredVars = configVars.NODE_ENV === 'test'
  ? commonRequiredVars
  : [ ...commonRequiredVars, ...additionalRequiredVars ]

logger.init(configVars.NODE_ENV)

const missingVars = requiredVars.filter(required => !configVars.hasOwnProperty(required) || configVars[required] === undefined || configVars[required === null])
if (missingVars.length > 0) {
  const missingVarsText = missingVars.join(',')
  logger.error(`${missingVarsText} not found in 'config-vars.json' file.`, { scope: 'startup' })
  process.exit(1)
}

module.exports = {
  'node_env': configVars.NODE_ENV,
  api: {
    env: configVars.NODE_ENV,
    port: configVars.API_PORT,
    timeout: configVars.API_TIMEOUT,
    cors: {
      allowed: []
    }
  },
  db: {
    ...configVars['sequelize_db'],
    logging: configVars.NODE_ENV === 'test' ? logger.trace : false,
    pool: {
      min: 0,
      max: configVars.DB_POOL_SIZE,
      idle: configVars.DB_CONNECTION_IDLE
    }
  }
}
