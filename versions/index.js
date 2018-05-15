const requireAll = require('require-all')

const versions = requireAll({ dirname: __dirname, excludeDirs: /^(test|out)$/ })
delete versions.index

module.exports = versions
