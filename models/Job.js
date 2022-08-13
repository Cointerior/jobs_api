const mongoose = require("mongoose")
const Schema = mongoose.Schema

const jobSchema = new Schema({
  company: {
    type: String,
    trim: true,
    required: true
  },
  position: {
    type: String,
    trim: true,
    required: true
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "Datauser",
    require: true
  }
}, { timestamps: true })

module.exports = mongoose.model("Jobdata", jobSchema)