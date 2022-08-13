const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    enum: ["user", "hod", "admin"],
    default: ["user"]
  },
  refreshToken: String
})

/*userSchema.methods.createAccess = () => {
  const roles = Object.values(this.roles)
  const accessToken = jwt.sign(
    {"userInfo": {
      "id": this._id,
      "role": roles
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "60s" }
    ) 
    return accessToken
} */

/*userSchema.methods.createRefresh = () => {
  const refreshToken = jwt.sign(
    { "email": this.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
    ) 
    return refreshToken
} */

/*userSchema.methods.bcryptPwd = async (word) => {
  const newPwd = bcrypt.compare(this.password, word)
  return newPwd
} */



module.exports = mongoose.model("Datauser", userSchema)