const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  created_at: Date,
});

module.exports = mongoose.model("Company", companySchema);
