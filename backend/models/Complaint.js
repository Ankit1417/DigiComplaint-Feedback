// const mongoose = require("mongoose");

// const complaintSchema = new mongoose.Schema(
//   {
//     complaintId: {
//       type: String,
//       required: true,
//       unique: true, // Ensures no duplicates
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     category: {
//       type: String,
//       required: true,
//     },
//     department: {
//       type: String,
//       required: true,
//     },
//     assignTo: {
//       type: String,
//       required: true,
//     },
//     attachment: {
//       type: String,
//     },
//     isAnonymous: {
//       type: Boolean,
//       default: false,
//     },
//     status: {
//       type: String,
//       enum: ["Pending", "In Progress", "Resolved", "Rejected"],
//       default: "Pending",
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

// module.exports = mongoose.model("Complaint", complaintSchema);

const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    complaintId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    assignTo: {
      type: String,
      required: true,
    },
    attachment: {
      type: String,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved", "Rejected"],
      default: "Pending",
    },
    updates: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ["Pending", "In Progress", "Resolved", "Rejected"],
        },
        description: {
          type: String,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Complaint", complaintSchema);
