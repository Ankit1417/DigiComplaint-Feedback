const Complaint = require("../models/Complaint");

// 1. Get all complaints
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("user", "email");
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch complaints", error: err.message });
  }
};

// 2. Get complaint by ID
exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate("user", "email");

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch complaint", error: err.message });
  }
};

// 3. Update complaint status and response
exports.updateComplaint = async (req, res) => {
  try {
    const { status, response } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    const statusChanged = status && status !== complaint.status;

    // Update status and/or response
    if (statusChanged) {
      complaint.status = status;
    }

    if (statusChanged || response) {
      complaint.updates.push({
        status: status || complaint.status,
        description: response || "Status updated by admin",
      });
    }

    await complaint.save();

    res.status(200).json({ message: "Complaint updated successfully", complaint });
  } catch (err) {
    res.status(500).json({ message: "Failed to update complaint", error: err.message });
  }
};

// 4. Get dashboard stats
exports.getComplaintStats = async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: "Pending" });
    const inProgress = await Complaint.countDocuments({ status: "In Progress" });
    const resolved = await Complaint.countDocuments({ status: "Resolved" });

    res.status(200).json({ total, pending, inProgress, resolved });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats", error: err.message });
  }
};
