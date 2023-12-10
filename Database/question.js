const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
});

module.exports = mongoose.model("questions", questionSchema);
