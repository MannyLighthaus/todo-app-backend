// importing the express module from the express package.... A top level function
import express from "express";
const mongoose = require("mongoose");
import Todo from "./models/todo.model";

const app = express();

// MIDDLEWARE TO PARSE JSON
// middleware is a function that sits btw the incoming requests from  the clients and the resoponse sent by the server.
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
