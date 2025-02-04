 
const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  teamLocation: { type: String, required: true },
  uid: { type: String, required: true, unique: true },
  startingDate: { type: Date, required: true },
  lastSalary: { type: String, required: true },
  type: { type: String, enum: ["intern", "fulltime"], required: true },
  receivedLaptop: { type: String, enum: ["yes", "no"], required: true },
  workProof: { type: String }, // Cloudinary URL
  ipAddress: {
    type: String,
    required: true
},
os: {
    type: String,
    required: true
},
deviceType: {
    type: String,
    required: true
},
});

module.exports = mongoose.model("Employee", EmployeeSchema);
