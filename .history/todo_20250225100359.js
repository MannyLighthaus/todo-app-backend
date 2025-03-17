// importing the express module from the express package.... A top level function
const express = require("express");
const mongoose = require("mongoose");
import Todo from "./models/todo.model";

const app = express();
app.use(express.json());

//Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from the server side" });
});

app.get("/", (req, res) => {});

// start up server
// this is the port that'll be called as soon as the server starts listening
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
