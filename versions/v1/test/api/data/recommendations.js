const recommendation = {
  id: 1,
  msisdn: '5511930000949',
  document: '18278772860',
  customercode: '21595001',
  spcodeinternetpack1: '1',
  sncodeinternetpack1: '1',
  internetdatapack1: '1',
  valueinternetpack1: '1',
  idnextplan1: '2292',
  internetdatanextplan1: '10GB',
  databonusnextplan1: '2GB',
  loyaltynextplan1: 'validade 12 meses',
  voicedatanextplan1: 'Ilimitada',
  valuenextplan1: '109.99',
  valuenextplan1withoutdiscount: '149.90'
}

const recommendationFormated = {
  customercode: '21595001',
  msisdn: '5511930000949',
  document: '18278772860',
  package: {
    spcodeinternetpack: '1',
    sncodeinternetpack: '1',
    internetdatapack: '1',
    valueinternetpack: '1'
  },
  plan: {
    idnextplan: '2292',
    internetdatanextplan: '10GB',
    databonusnextplan: '2GB',
    loyaltynextplan: 'validade 12 meses',
    voicedatanextplan: 'Ilimitada',
    valuenextplan: '109.99',
    valuenextplanwithoutdiscount: '149.90'
  }
}

module.exports = {
  recommendation,
  recommendationFormated
}
