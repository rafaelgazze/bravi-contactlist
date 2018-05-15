const Router = require('koa-router')
const services = require('./src/services')

const createRouter = () => {
  const router = new Router()

  setRoutes(router)

  return router
}

const setRoutes = (router) => {
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
