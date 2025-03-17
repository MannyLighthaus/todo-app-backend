// importing the express module from the express package.... A top level function
import express from "express";
import mongoose from "mongoose";
import Todo from "./models/todo.model";

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
app.get("/api/todos/:id", async (req, res) => {
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
    res.status(201).json(newTodo); // respond with the newly created todo
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// // UPDATE A TODO BASED ON ID
// app.put("/api/person/:id", async (req, res) => {
//   try {
//     const {id} = req.params;
//     const todo = await Todo.findByIdAndUpdate(id, req.body);

//   }
// })

//UPDATE A PERSON BASED ON ID
app.put("/api/person/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const person = await Person.findByIdAndUpdate(id, req.body);

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }
    //have it rechecked from the database.. this ensures the response contains the updated version of the document
    //after each update, a frsh query is performed to retrieve the updated dpcument from the database
    const updatedPerson = await Person.findById(id);
    res.status(200).json(updatedPerson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
