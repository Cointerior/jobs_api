const express = require("express")
const router = express.Router()
const register = require("../controllers/register")
const auth = require("../controllers/auth")
const logout = require("../controllers/logout")

router.route("/")
  .post(register)
  
router.route("/auth")
  .post(auth)
  
router.route("/logout")
  .get(logout)

module.exports = router