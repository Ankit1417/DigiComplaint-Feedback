const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const { submitComplaint } = require("../controllers/complaintController");

router.post("/", authMiddleware, upload.single("attachment"), submitComplaint);

module.exports = router;
