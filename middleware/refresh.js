require("dotenv").config()
const jwt = require("jsonwebtoken")
const Datauser = require("../models/User")
const unAuth = require("../error/unAuth")
const { StatusCodes } = require("http-status-codes")

const refresh = async (req, res) => {
  const cookies = req.cookies
  if(!cookies?.jwt) {
     throw new unAuth("No cookies")
  }
  const refreshToken = cookies.jwt
  console.log(refreshToken)
  const foundUser = await Datauser.findOne({ refreshToken }).exec()
  if(!foundUser) {
    throw new unAuth("No user found")
  }
  jwt.verify(
    refreshToken,
    process.env.RRFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if(err || foundUser.email !== decoded.email) {
        console.log(err)
      //  throw new unAuth("Something fishy")
      }
      console.log("Hi")
      const accessToken = jwt.sign(
        {"userInfo": {
          "id": foundUser._id,
          "role": foundUser.roles
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
        )
        res.status(StatusCodes.OK).json({ accessToken })
    }
    )
}

module.exports = refresh


