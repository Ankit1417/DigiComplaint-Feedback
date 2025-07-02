// const mongoose = require("mongoose");

// const feedbackSchema = new mongoose.Schema(
//   {
//     category: {
//       type: String,
//       required: true,
//     },
//     rating: {
//       type: Number,
//       required: true,
//       min: 1,
//       max: 5,
//     },
//     comment: {
//       type: String,
//       required: true,
//     },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Feedback", feedbackSchema);

const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    isAnonymous: { type: Boolean, default: false }, // ✅ new field
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
