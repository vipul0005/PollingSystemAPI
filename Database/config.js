const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/polling-system");
const mongoURI = "mongodb+srv://beast05:0000@backendprojects.h67oeix.mongodb.net/csv-viewer";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error.message);
  });
