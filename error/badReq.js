const customErr = require("./customErr")
const { StatusCodes } = require("http-status-codes")

class badReq extends customErr {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

module.exports = badReq