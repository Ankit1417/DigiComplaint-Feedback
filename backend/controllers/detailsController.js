const Complaint = require("../models/Complaint");

// Get all complaints by the logged-in student
exports.getStudentComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch complaints", error: err.message });
  }
};

// Update a complaint
exports.updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (complaint.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this complaint" });
    }

    const updates = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      department: req.body.department,
      assignTo: req.body.assignTo,
      isAnonymous: req.body.isAnonymous,
    };

    if (req.file) {
      updates.attachment = req.file.path;
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    res.status(200).json({ message: "Complaint updated", updatedComplaint });
  } catch (err) {
    res.status(500).json({ message: "Failed to update complaint", error: err.message });
  }
};

// Delete a complaint
exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (complaint.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this complaint" });
    }

    await complaint.deleteOne();
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete complaint", error: err.message });
  }
};
// Get a single complaint by ID
exports.getComplaintById = async (req, res) => {
    try {
      const complaint = await Complaint.findById(req.params.id).populate("user", "name email");
  
      if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
      }
  
      if (
        complaint.user._id.toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
      ) {
        return res.status(403).json({ message: "Not authorized to view this complaint" });
      }
  
      res.status(200).json(complaint);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch complaint", error: err.message });
    }
  };
  