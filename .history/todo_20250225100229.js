// importing the express module from the express package.... A top level function

import mongoose from "mongoose";
import Person from "./models/person.model.js";

const express = require("express");

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
