const express = require("express");
const router = express.Router();
const {
  getAllComplaints,
  getComplaintById,
  updateComplaint,
  getComplaintStats,
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");

// Admin-only routes
router.get("/complaints", authMiddleware, getAllComplaints); // for AdminComplaints.jsx
router.get("/complaints/stats", authMiddleware, getComplaintStats); // for AdminDashboard.jsx
router.get("/complaints/:id", authMiddleware, getComplaintById); // for AdminComplaintDetails.jsx
router.put("/complaints/:id", authMiddleware, updateComplaint); // for status/response update

module.exports = router;
