const express = require("express");
const router = express.Router();

const { trackComplaintById } = require("../controllers/trackController");

// Public route to track complaint by ID (no login needed)
router.get("/:complaintId", trackComplaintById);

module.exports = router;
