module.exports = {
  'subscription:list': {
    'page': {
      in: 'query',
      isOptionalPositiveInteger: true
    },
    'limit': {
      in: 'query',
      isOptionalPositiveInteger: true
    }
  }
}
