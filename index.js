const express = require("express");

require("./Database/config");

const Question = require("./Database/question");
const Option = require("./Database/option");

const app = express();
app.use(express.json());

app.post("/questions/create", async (request, response) => {
  const question = new Question(request.body);
  const result = await question.save();
  if (result) {
    response.send(result);
  } else {
    response.send("Error In Question Creation!!!");
  }
});

// Add options to a specific question
app.post("/questions/:id/options/create", async (request, response) => {
  const { id } = request.params;
  const option = new Option({ ...request.body, questionId: id });
  const result = await option.save();
  if (result) {
    response.send(result);
  } else {
    response.send("Error In Option Creation!!!");
  }
});

// View a question and its options
app.get("/questions/:id", async (request, response) => {
  const { id } = request.params;
  const question = await Question.findById(id);
  if (question) {
    const options = await Option.find({ questionId: id });
    const formattedOptions = options.map((option) => ({
      id: option.id,
      text: option.text,
      votes: option.votes,
      link_to_vote: `http://localhost:3002/options/${option.id}/add_vote`,
    }));

    const result = {
      id: question.id,
      title: question.title,
      options: formattedOptions,
    };
    response.send(result);
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

  if (question) {
    const hasVotes = await Option.exists({ questionId: id, votes: { $gt: 0 } });

    if (hasVotes) {
      response.send("Its Options Have votes");
    } else {
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
      await Option.deleteOne({ _id: id });
      response.send("option Deleted");
    }
  } else {
    response.send("No Option Found");
  }
});

app.listen(3002);
