const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
  text: { type: String, required: true },
  votes: { type: Number, default: 0 },
});

module.exports = mongoose.model("options", optionSchema);
