const Userdata = require("../models/User")
const jwt = require("jsonwebtoken")

const logout = async (req, res) => {
  const cookies = req.cookies
  if(!cookies?.jwt) res.status(401).json({ msg: "no" })
  const refreshToken = cookies.jwt
  console.log(refreshToken)
  const foundUser = await Userdata.findOne({ refreshToken }).exec()
  console.log(foundUser)
  if(!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })
    console.log("okay")
  } else {
    foundUser.refreshToken = " "
    
    const result = await foundUser.save()
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })
    res.status(204).json({ foundUser })
    console.log("Cleared cookie")
  }
}

module.exports = logout