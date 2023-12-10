const express = require("express");

require("./Database/config");

const Question = require("./Database/question");
const Option = require("./Database/option");

const app = express();
app.use(express.json());

// Create a unique question
app.post("/questions/create", async (request, response) => {
  const { title } = request.body;

  const existingQuestion = await Question.findOne({ title: title });

  if (existingQuestion) {
    response.send("Question already exits");
  } else {
    const question = new Question(request.body);
    const result = await question.save();
    if (result) {
      response.send(result);
    } else {
      response.send("Error In Question Creation!!!");
    }
  }
});

// Add options to a specific question
app.post("/questions/:id/options/create", async (request, response) => {
  const { id } = request.params;
  const question = await Question.findById(id);

  if (!question) {
    response.send("Setting option for non-existing question");
  } else {
    const option = new Option({
      text: request.body.text,
      votes: request.body.votes,
      questionId: id,
    });

    const url = `https://polling-system-api-ofd2.onrender.com`;
    option.link_to_vote = `${url}/options/${option.id}/add_vote`;
    const result = await option.save();

    if (result) {
      question.options.push(option._id);
      await question.save();
      response.send(result);
    } else {
      response.send("Error In Option Creation!!!");
    }
  }
});

// View a question and its options

app.get("/questions/:id", async (request, response) => {
  const { id } = request.params;

  const question = await Question.findById(id).populate("options");

  if (question) {
    response.send(question);
  } else {
    response.send("No Question Found");
  }
});

// Increment the count of votes
app.put("/options/:id/add_vote", async (request, response) => {
  const { id } = request.params;
  const option = await Option.findOne({ _id: id });
  if (option) {
    option.votes += 1;
    const result = await option.save();
    response.send(result);
  } else {
    response.send("Option Not Found");
  }
});

// Delete a question
app.delete("/questions/:id/delete", async (request, response) => {
  const { id } = request.params;
  const question = await Question.findOne({ _id: id });

  if (!question) {
    response.send("No Question Found");
  } else if (question) {
    const hasVotes = await Option.exists({ questionId: id, votes: { $gt: 0 } });

    if (hasVotes) {
      response.send("Its Options Have votes");
    } else {
      await Option.deleteMany({ _id: { $in: question.options } });
      await Question.deleteOne({ _id: id });
      response.send("Question Deleted Successfully");
    }
  } else {
    response.send("No Question Found");
  }
});

// Delete an option
app.delete("/options/:id/delete", async (request, response) => {
  const { id } = request.params;
  const option = await Option.findOne({ _id: id });
  if (option) {
    if (option.votes > 0) {
      response.send("Option has Votes");
    } else {
      await Question.findByIdAndUpdate(option.questionId, { $pull: { options: option.id } });
      await Option.deleteOne({ _id: id });
      response.send("option Deleted");
    }
  } else {
    response.send("No Option Found");
  }
});

app.listen(3002);
