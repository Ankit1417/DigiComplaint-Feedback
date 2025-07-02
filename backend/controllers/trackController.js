const Complaint = require("../models/Complaint");

// Track a complaint by complaintId (CMP-xxxxx)
exports.trackComplaintById = async (req, res) => {
  try {
    const { complaintId } = req.params;

    const complaint = await Complaint.findOne({ complaintId });

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json(complaint);
  } catch (err) {
    res.status(500).json({
      message: "Failed to track complaint",
      error: err.message,
    });
  }
};
