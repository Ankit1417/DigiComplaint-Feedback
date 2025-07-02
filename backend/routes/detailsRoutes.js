const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  submitComplaint,
} = require("../controllers/complaintController");

const {
  getStudentComplaints,
  updateComplaint,
  deleteComplaint,
  getComplaintById,
} = require("../controllers/detailsController");

// Submit a new complaint
router.post("/", authMiddleware, upload.single("attachment"), submitComplaint);

// Get all complaints by the logged-in student
router.get("/", authMiddleware, getStudentComplaints);

// Get one complaint by ID (optional, if needed)
router.get("/:id", authMiddleware, getComplaintById);

// Update a complaint
router.put("/:id", authMiddleware, upload.single("attachment"), updateComplaint);

// Delete a complaint
router.delete("/:id", authMiddleware, deleteComplaint);

module.exports = router;
