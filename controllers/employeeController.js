const Employee = require("../models/employeeModel");
const useragent = require("useragent");
const { uploadToCloudinary } = require("../middleware/upload");

const registerEmployee = async (req, res) => {
  try {
    const ipAddress = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.ip;
    const agent = useragent.parse(req.headers["user-agent"]);
    const os = agent.os.toString();
    const deviceType = agent.device.toString();

    const { username, password, teamLocation, uid, startingDate, lastSalary, type, receivedLaptop } = req.body;

    // Handle file upload (if provided)
    let workProof = req.file ? req.file.path : null;

    if (req.file) {
      const cloudinaryUrl = await uploadToCloudinary(req.file.path);
      if (cloudinaryUrl) workProof = cloudinaryUrl;
    }

    const employee = new Employee({
      username,
      password,
      teamLocation,
      uid,
      startingDate,
      lastSalary,
      type,
      receivedLaptop,
      workProof,
      ipAddress,
      os,
      deviceType,
    });

    await employee.save();
    res.status(201).json({ message: "Employee registered successfully", employee });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerEmployee };
