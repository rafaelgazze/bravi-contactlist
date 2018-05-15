const createServer = require('../../helpers/create-server')
const db = require('../../../src/models')
const lib = require('../../../src/lib')
const { recommendation, recommendationFormated } = require('../data/recommendations')
const sinon = require('sinon')

describe('/recommendation', () => {
  let request, sandbox, token
  before(async () => {
    await db.sequelize.sync({ force: true })
  })
  beforeEach(async () => {
    sandbox = sinon.sandbox.create()
    request = await createServer()
    token = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRDb2RlUm9vdCI6IjcuNjA1NjU4MSIsImNsaWVudENvZGUiOiI3LjYwNTY1ODEuMTAiLCJtc2lzZG4iOiIxMTk4NTcxODYwMCIsImNvbnRyYWN0SWQiOiIyMTU5NTAwMSIsImV4cGlyZUN1c3RvbWVyIjoxNTIyNDQxMDMyMjExLCJwbGFuIjoiSW50ZXJub18wMiIsImlhdCI6MTUxOTg0OTAzMiwiZXhwIjoxNTIyNDQxMDMyLCJpc3MiOiJOZXh0ZWwifQ.v7ZD7k3gY6h1ZQIJJd92dMUA4mw73wvxkH4lb2D05wmPsvz2cLLUOb4BfxZQ5nfKC_cr-1mo2ctreW_1O-GwzkBJGaOu0cV-zF9vu8g6snH1jwwlbp2jsJv66xC4R7GO7moCz7P8sUIItD-GsMJ0KZmVVCldK4Lj0nbnmX3Phkk'
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('without token', async () => {
    await request.get(`/v1/recommendation`)
      .set('Authorization', null)
      .expect(401)
      .expect({
        code: 2,
        message: 'Cliente não autenticado'
      })
  })

  it('with result', async () => {
    sandbox.stub(lib, 'findRecommendations').returns(recommendation)
    await request.get(`/v1/recommendation`)
      .set('Authorization', token)
      .expect(200)
      .expect(recommendationFormated)
  })

  it('without result', async () => {
    sandbox.stub(lib, 'findRecommendations').returns(null)
    await request.get(`/v1/recommendation`)
      .set('Authorization', token)
      .expect(200)
      .expect({})
  })
})
