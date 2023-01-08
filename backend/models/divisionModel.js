const mongoose = require("mongoose");

const divisionSchema = new mongoose.Schema(
  {
    division: {
      type: String,
    },
  },
  { timestamps: true }
);

const Division = mongoose.model("Division", divisionSchema);

module.exports = Division;