const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Record must belong to a User!"],
    },
    division: {
      type: String,
    },
    title: {
      type: String,
    },
    date: {
      type: Date,
    },
    notes: {
      type: String,
    },
    bunting: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;