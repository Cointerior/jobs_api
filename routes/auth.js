const express = require("express")
const router = express.Router()
const register = require("../controllers/register")
const auth = require("../controllers/auth")
const logout = require("../controllers/logout")

router.route("/")
  .post(auth)


module.exports = router