const createServer = require('../../helpers/create-server')
const lib = require('../../../src/lib')
const { people, peoples } = require('../data/people')
const sinon = require('sinon')

describe('/get', () => {
  let request, sandbox
  before(async () => {
  })
  beforeEach(async () => {
    sandbox = sinon.sandbox.create()
    request = await createServer()
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('with result', async () => {
    sandbox.stub(lib.People, 'findPeople').returns(people)
    sandbox.stub(lib.Contact, 'listContact').returns('[{ id:"1", value:"123456789", type: "celular" }]')
    await request.get(`/v1/get`)
      .expect(200)
  })

  it('without result', async () => {
    sandbox.stub(lib.People, 'findPeople').returns(null)
    await request.get(`/v1/get`)
      .expect(200)
      .expect({})
  })
})

describe('/list', () => {
  let request, sandbox
  before(async () => {
  })
  beforeEach(async () => {
    sandbox = sinon.sandbox.create()
    request = await createServer()
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('with result', async () => {
    sandbox.stub(lib.People, 'list').returns(peoples)
    sandbox.stub(lib.Contact, 'listContact').returns('[{ id:"1", value:"123456789", type: "celular" }]')
    await request.get(`/v1/list`)
      .expect(200)
  })

  it('without result', async () => {
    sandbox.stub(lib.People, 'list').returns(null)
    await request.get(`/v1/list`)
      .expect(200)
      .expect({})
  })
})

// OTHER EXAMPLES for UNIT TESTING
