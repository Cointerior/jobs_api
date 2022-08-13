const jwt = require("jsonwebtoken")
const unAuth = require("../error/unAuth")

const verifyjwt = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization
  if(!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new unAuth("Wrong token")
  }
  console.log(authHeader)
  const token = authHeader.split(" ")[1]
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
    if(err) throw new unAuth("expired token")
      req.role = decoded.userInfo.role
      console.log(req.role)
      next()
    }
    )
}

module.exports = verifyjwt