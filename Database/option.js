const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
  text: { type: String, required: true },
  votes: { type: Number, default: 0 },
  link_to_vote: { type: String },
});

const Option = mongoose.model("Option", optionSchema); // Register the model

module.exports = Option;
