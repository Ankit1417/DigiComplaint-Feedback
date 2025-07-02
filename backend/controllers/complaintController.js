// const Complaint = require("../models/Complaint");

// // Helper to generate random 5-digit ID with CMP- prefix
// const generateUniqueComplaintId = () => {
//   return "CMP-" + Math.floor(10000 + Math.random() * 90000);
// };

// exports.submitComplaint = async (req, res) => {
//   try {
//     const { title, description, category, department, assignTo, isAnonymous } = req.body;

//     // Generate a unique 5-digit complaint ID
//     let complaintId;
//     let isUnique = false;

//     while (!isUnique) {
//       complaintId = generateUniqueComplaintId();
//       const existing = await Complaint.findOne({ complaintId });
//       if (!existing) isUnique = true;
//     }

//     const complaint = new Complaint({
//       complaintId, // ✅ Include generated ID
//       title,
//       description,
//       category,
//       department,
//       assignTo,
//       isAnonymous,
//       user: req.user.id,
//       attachment: req.file ? req.file.path : null,
//     });

//     await complaint.save();
//     res.status(201).json({ message: "Complaint submitted successfully", complaint });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to submit complaint", error: err.message });
//   }
// };

const Complaint = require("../models/Complaint");

// Helper to generate random 5-digit ID with CMP- prefix
const generateUniqueComplaintId = () => {
  return "CMP-" + Math.floor(10000 + Math.random() * 90000);
};

exports.submitComplaint = async (req, res) => {
  try {
    const { title, description, category, department, assignTo, isAnonymous } = req.body;

    // Generate a unique 5-digit complaint ID
    let complaintId;
    let isUnique = false;

    while (!isUnique) {
      complaintId = generateUniqueComplaintId();
      const existing = await Complaint.findOne({ complaintId });
      if (!existing) isUnique = true;
    }

    const complaint = new Complaint({
      complaintId,
      title,
      description,
      category,
      department,
      assignTo,
      isAnonymous,
      user: req.user.id,
      attachment: req.file ? req.file.path : null,
      updates: [
        {
          status: "Pending",
          description: "Complaint submitted.",
        },
      ],
    });

    await complaint.save();
    res.status(201).json({ message: "Complaint submitted successfully", complaint });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit complaint", error: err.message });
  }
};
