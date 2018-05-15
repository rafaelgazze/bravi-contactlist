const createServer = require('../../helpers/create-server')

describe('/health', () => {
  let request
  beforeEach(async () => {
    request = await createServer()
  })
  it('200: healthy', () => request.get('/v1/health').expect(200, { '/health': true }))
})
