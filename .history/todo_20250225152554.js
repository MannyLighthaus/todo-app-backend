// importing the express module from the express package.... A top level function
import express from "express";
import mongoose from "mongoose";
import Todo from "./models/todo.model.js";

const app = express();
const PORT = 3000;

// MIDDLEWARE TO PARSE JSON
// middleware is a function that sits btw the incoming requests from  the clients and the resoponse sent by the server.
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://manny:8gwXrEiarointZst@backenddb.tkrlx.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected to database");
    // Start the server only after the database connection is established
    // the .listen method allows us to listen to the port for incoming requests
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error: ${err}`); // Corrected template literal syntax
  });

// ROUTE

// let todos = [];

// GET ALL TODOS
app.get("/api/todos", async (req, res) => {
  try {
    const getTodos = await Todo.find({});
    res.status(200).json(getTodos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET A SINGLE TODO BY ID
app.get("/api/todo/:id", async (req, res) => {
  try {
    const { id } = req.params; // extract the id from the request (URL parameter)
    const todo = await Todo.findById(id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE A NEW TODO
app.post("/api/todos", async (req, res) => {
  try {
    const newTodo = await Todo.create(req.body); // create new Todo in mongodb
    console.log(req.body);
    res.status(201).json(newTodo); // respond with the newly created todo
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE A TODO BASED ON ID
app.put("/api/todo/:id", async (req, res) => {
  try {
    const { id } = req.params; //retrieving the id from the URL
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true }); // new: true queries the db to return the updated document

    if (!todo) {
      return res.status(404).json({ message: "person not found" });
    }
    //have it rechecked from the database.. this ensures the response contains the updated version of the document
    //after each update, a fresh query is performed to retrieve the updated dpcument from the database
    // const updatedTodo = await Todo.findById(id);
    // res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE A TODO BY ID
app.delete("/api/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    // if the todo doesn't exist
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    // if the Todo is found and deleted
    res.status(200).json({ message: "Todo successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "error message" });
  }
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
