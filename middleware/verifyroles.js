const roleList = require("../config/rolesList")
const unAuth = require("../error/unAuth")

const verifyroles = (...list) => {
  return (req, res, next) => {
    if(!req?.role) {
      throw new unAuth("Disallowed")
    }
  const listR = [...list]
  console.log(req.role)
  const user = req.role.map(role => listR.includes(role)).find(value => value === true)
  console.log(user)
  if(!user) {
    throw new unAuth("You're not permitted to perform this action")
  } else {
    next()
  }
  }
}

module.exports = verifyroles


/*const listR = [...list]
  const user = listR.map(role => roleList.includes(role).find(value => value === true))
  if(!user) {
    throw new unAuth("You're not permitted to perform this action")
  } else {
    next()
  } */