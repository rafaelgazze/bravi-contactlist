require('rootpath')()

const Koa = require('koa')
const Router = require('koa-router')
const convert = require('koa-convert')
const body = require('koa-bodyparser')
const cors = require('@koa/cors')

// const config = require('configs')

const versions = require('versions')

const health = require('./health/health')
// const logger = require('./utils/logger')
const originFilter = require('./utils/cors/filter')

/*  eslint-disable max-statements */
const createServer = () => {
  const app = new Koa()
  const router = new Router()

  health.config(router)

  app.use(cors({ origin: ({request: {header: {origin}}}) => originFilter(origin) }))
  app.use(convert(body()))

  for (let v in versions) {
    const routes = versions[v].index.routes()
    router.use(`/${v}`, routes)
  }
  app.use(router.routes())

  return app
}

module.exports = createServer
