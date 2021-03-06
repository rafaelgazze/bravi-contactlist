require('rootpath')()
const logger = require('server/utils/logger')

/**
 * @version v.1.0
 * @module services/health
 * @method [services/health] get
 * @description Builds response payload with flags indicating the health of the microservice
 * @param  {KoaContext} ctx
*/
const get = async ctx => {
  logger.debug('Getting server health information!', { scope: 'api' })
  ctx.body = { '/health': true }
}

module.exports = {
  get
}
