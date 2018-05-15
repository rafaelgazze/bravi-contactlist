const { isBoolean } = require('lodash')
const versions = require('versions')
const { api: config } = require('../../configs')
const request = require('request-promise')

const checkVersionHealth = version => request.get(`http://localhost:${config.port}/${version}/health`).then(JSON.parse)

const checkGlobalHealth = versions => Promise.all(Object.keys(versions).map(checkVersionHealth))

const getHealthStatus = checks =>
  checks.reduce((status, current) => status && (isBoolean(current) ? current : getHealthStatus(Object.values(current))), true)

const execute = ctx => checkGlobalHealth(versions)
  .then(getHealthStatus)
  .then(health => { ctx.body = health })

module.exports = {
  config: router => router.get(`/health`, execute)
}
