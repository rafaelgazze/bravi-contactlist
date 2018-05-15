const lib = require('../../../src/lib')
const { Recommendation: model } = require('../../../src/models')

describe('#RecommendationLib', () => {
  let sandbox, offers

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    offers = {
      customercode: '21595001',
      databonusnextplan1: '2GB',
      document: '18278772860',
      id: 1,
      idnextplan1: '2292',
      internetdatanextplan1: '10GB',
      internetdatapack1: '1',
      loyaltynextplan1: 'validade 12 meses',
      msisdn: '5511930000949',
      sncodeinternetpack1: '1',
      spcodeinternetpack1: '1',
      valueinternetpack1: '1',
      valuenextplan1withoutdiscount: '149.90',
      voicedatanextplan1: 'Ilimitada'
    }
  })

  afterEach(() => {
    sandbox.restore()
  })

  context('when recommendation does not exist', () => {
    it('returns null', () => {
      sandbox.stub(model, 'findOne').returns(Promise.resolve(null))
      console.log(lib.findRecommendations('1234'))
      return expect(lib.findRecommendations('1234')).to.be.eventually.null
    })
  })

  context('when recommendation does exist', () => {
    it('returns object', () => {
      sandbox.stub(model, 'findOne').returns(Promise.resolve(offers))
      console.log(lib.findRecommendations('1234'))
      return expect(lib.findRecommendations('1234')).to.be.eventually.deep.equals(offers)
    })
  })
})
