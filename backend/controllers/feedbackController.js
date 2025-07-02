// const Feedback = require("../models/Feedback");

// // POST /api/feedback (Student submits feedback)
// exports.submitFeedback = async (req, res) => {
//   try {
//     const { category, rating, comment } = req.body;

//     const feedback = new Feedback({
//       category,
//       rating,
//       comment,
//       user: req.user.id,
//     });

//     await feedback.save();
//     res.status(201).json({ message: "Feedback submitted successfully", feedback });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to submit feedback", error: err.message });
//   }
// };

// // GET /api/feedback (Admin views all feedback)
// exports.getAllFeedback = async (req, res) => {
//   try {
//     const feedbackList = await Feedback.find().populate("user", "email");
//     res.status(200).json(feedbackList);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch feedback", error: err.message });
//   }
// };

const Feedback = require("../models/Feedback");

// 1. Submit Feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { category, rating, comment, isAnonymous } = req.body;

    const feedback = new Feedback({
      category,
      rating,
      comment,
      isAnonymous: isAnonymous || false,
      user: req.user.id,
    });

    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully", feedback });
  } catch (err) {
    res.status(500).json({ message: "Error submitting feedback", error: err.message });
  }
};

// 2. Get All Feedbacks for Admin
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("user", "email");

    const formatted = feedbacks.map(fb => ({
      _id: fb._id,
      category: fb.category,
      rating: fb.rating,
      comment: fb.comment,
      isAnonymous: fb.isAnonymous,
      createdAt: fb.createdAt,
      userEmail: fb.isAnonymous ? "Anonymous" : fb.user.email,
    }));

    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch feedbacks", error: err.message });
  }
};
