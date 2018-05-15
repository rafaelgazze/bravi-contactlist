require('rootpath')()
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.use(sinonChai)
chai.should()
global.expect = chai.expect
global.assert = chai.assert
global.sinon = sinon
