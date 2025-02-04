const express = require("express");
const { registerEmployee } = require("../controllers/employeeController");
const { upload } = require("../middleware/upload");

const router = express.Router();

// Register Employee (handles both data and file upload)
router.post("/register", upload.single("workProof"), registerEmployee);

module.exports = router;
