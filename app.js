const express = require("express");
const path = require("path");
const app = express();

const port = 5500;

// EXPRESS SPECIFIC STUFF
app.use("static", express.static("static"));
app.use(express.static(path.join("static")));
app.use(express.urlencoded());

// ENDPOINTS
app.get("/contact.html", (req, res) => {
  app.use("static", express.static("static"));
  app.use(express.static(path.join("static")));
});

app.listen(port, () => {
  console.log("All Ok");
});

const mongoose = require("mongoose");
main().catch((err) => console.log(err));

async function main() {
  console.log("Running!!");
  await mongoose.connect("mongodb+srv://satyam:9Bn5smmfNXA0j39l@cluster0.ikb6mj9.mongodb.net/noteData?retryWrites=true&w=majority");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

  const db = mongoose.connection;
  console.log("Reached");

  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", () => {
    console.log("We are connected!! ");
  });

  // Define Mongoose Schema
  const contactformSchema = new mongoose.Schema({
    forName: String,
    forEmail: String,
    forNumber: Number,
    forIssue: String,
  });

  const NotesContactData = mongoose.model("Product", contactformSchema);

  app.post("/contact", (req, res) => {
    var myData = new NotesContactData(req.body);
    myData
      .save()
      .then(() => {
        res.send("Your issue recorded successfully!!");
      })
      .catch(() => {
        res.send("There is some problem in recording your issue!!");
      });
  });
}
