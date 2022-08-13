const mongoose = require("mongoose")

const connectDB = async () => {
  await mongoose.connect(process.env.DATABASE_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
}

module.exports = connectDB