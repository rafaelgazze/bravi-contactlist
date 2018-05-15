const fs = require('fs')
const path = require('path')

const loadJsons = (...files) => {
  const jsons = files.map(loadJson)
  return jsons.length === 1 ? jsons[0] : jsons
}

const loadJson = file => JSON.parse(fs.readFileSync(path.join(__dirname, '/../' + file)))

module.exports = loadJsons
