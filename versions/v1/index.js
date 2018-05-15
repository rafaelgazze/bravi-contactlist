const Router = require('koa-router')
const setValidators = require('koa-async-validator')

const configs = require('../../configs')
const logger = require('../../server/utils/logger')

const schemas = require('./src/utils/schemas')
const { messages } = require('./src/utils/error')
const services = require('./src/services')

const createRouter = () => {
  const router = new Router()

  setRoutes(router, { validate, authenticate })

  return router
}

const setRoutes = (router, { validate, authenticate }) => {
  const { health, contacts } = services

  router.get('/health', health.get)

  router.get('/list', contacts.list)
  router.get('/get', contacts.get)
  router.post('/create', contacts.insert)
  router.put('/update', contacts.update)
  router.delete('/delete', contacts.remove)

  return router
}

module.exports = {
  routes: () => createRouter().routes()
}
