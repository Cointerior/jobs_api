const bcrypt = require("bcryptjs")
const badReq = require("../error/badReq")
const unAuth = require("../error/unAuth")
const jwt = require("jsonwebtoken")
const Datauser = require("../models/User")
const { StatusCodes } = require("http-status-codes")


const auth = async (req, res) => {
  const { email, pwd } = req.body
  if(!email || !pwd) throw new badReq("Email and password required")
  const foundUser = await Datauser.findOne({ email: email }).exec()
  if(!foundUser) {
    throw new unAuth("Email does not exist")
  }
  const match = await bcrypt.compare(pwd, foundUser.password)
  if(!match) {
    throw new unAuth("Incorrect password")
  }
  const accessToken = jwt.sign(
    {"userInfo": {
      "id": foundUser._id,
      "role": foundUser.roles
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
    ) 
  const refreshToken = jwt.sign(
    { "email": foundUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "4d" }
    ) 
  
  foundUser.refreshToken = refreshToken
  const result = await foundUser.save()
  res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24*60*60*1000 })
  console.log(result)
  res.status(StatusCodes.OK).json({ accessToken })
 console.log(foundUser)
}

module.exports = auth


