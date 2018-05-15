require('rootpath')()

const createServer = require('server/create-server')
const config = require('configs')

const app = createServer()
app.listen(config.api.port)
