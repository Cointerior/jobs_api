const customErr = require("./customErr")
const { StatusCodes } = require("http-status-codes")

const errorHandler = (err, req, res, next) => {
  if(err instanceof customErr) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" })
}

module.exports = errorHandler