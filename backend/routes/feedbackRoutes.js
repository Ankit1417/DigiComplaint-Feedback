// const express = require("express");
// const router = express.Router();
// const { submitFeedback, getAllFeedback } = require("../controllers/feedbackController");
// const authMiddleware = require("../middleware/authMiddleware");

// // Route for student to submit feedback
// router.post("/", authMiddleware, submitFeedback);

// // Route for admin to view all feedback
// router.get("/", authMiddleware, getAllFeedback);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { submitFeedback, getAllFeedback } = require("../controllers/feedbackController");
const authMiddleware = require("../middleware/authMiddleware");

// Route for student to submit feedback
router.post("/", authMiddleware, submitFeedback);

// Route for admin to view all feedback
router.get("/", authMiddleware, getAllFeedback);

module.exports = router;
