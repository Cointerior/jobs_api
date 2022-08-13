const customErr = require("./customErr")
const { StatusCodes } = require("http-status-codes")

class unAuth extends customErr {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

module.exports = unAuth