const express = require("express")
const verifyroles = require("../middleware/verifyroles")
const rolesList = require("../config/rolesList")
const router = express.Router()
const {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob
} = require("../controllers/jobs")

router.route("/")
  .get(verifyroles("user"), getAllJobs)
  .post(verifyroles("hod", "admin"), createJob)

router.route("/:id")
  .get(getJob)
  .patch(verifyroles("hod", "admin"), updateJob)
  .delete(verifyroles("admin"), deleteJob)
  
module.exports = router