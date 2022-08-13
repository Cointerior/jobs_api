const bcrypt = require("bcryptjs")
const badReq = require("../error/badReq")
const Datauser = require("../models/User")
const regEx = require("../config/regEx")
require("express-async-errors")
const { StatusCodes } = require("http-status-codes")

const register = async (req, res) => {
  const { email, pwd, role } = req.body
  if(!email || !pwd) throw new badReq("You need to provide email and password")
 // const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
  const match = regEx.test(email)
  console.log(match)
  if(!match) throw new badReq("Enter a valid email")
  const foundUser = await Datauser.findOne({ email: email }).exec()
  if(foundUser) throw new badReq("Email already used")
  console.log("foundUser")
  if(role) {
      if(role !== "hod" && role !== "admin") {
    throw new badReq('Select either "hod" or "admin" as your role... Having the "admin" role will automatically guarantee the "hod" role')
     }
  }
  const hashpwd = await bcrypt.hash(pwd, 10)
  
  let result;
  
  if(role) {
    result = await Datauser.create({
      email: email,
      password: hashpwd,
      roles: role
    })
  } else {
    result = await Datauser.create({
      email: email,
      password: hashpwd
    })
  }
  
  console.log(result)
  res.status(StatusCodes.CREATED).json({ result })
  
}

module.exports = register 