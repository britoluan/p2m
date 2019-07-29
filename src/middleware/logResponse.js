const { uuid } = require('./uuid')
const logger = require('../utils/logger')
const mung = require('express-mung')
const Exception = require('../utils/exception')
const CustomException = require('../exceptions/customException')

module.exports.logResponse = function(){
  mung.json(function transform (body, req, res) {
    const log = {
      uuid: uuid(),
      response: {
        status: res.statusCode,
        body: body
      }
    }
    logger.info(log)
    return body
  }, mungError = true)

module.exports.logEndpointNotFound = function(req, res, next) {
  Exception.check(
    new CustomException('Unknown http method or endpoint', 415),
    res
  )
  next()
}
