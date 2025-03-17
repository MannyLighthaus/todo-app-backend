// importing the express module from the express package.... A top level function
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Todo from "./models/todo.model.js";

const app = express();
const PORT = 3000;

// enable CORS for all requests
app.use(cors()); // if F.E is on a different PORT, allow CORS

// MIDDLEWARE TO PARSE JSON
// middleware is a function that sits btw the incoming requests from  the clients and the resoponse sent by the server.
app.use(express.json()); // allow frontend to access the API

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

app.get("/", (req, res) => {
  res.json({ message: "Hello from manny" });
});

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
    // if the todo doesn;t exist, return a 404 reponse

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    console.error("Error fetching todo:", error);
    res.status(500).json({ message: error.message });
  }
});

// CREATE A NEW TODO
app.post("/api/todos", async (req, res) => {
  try {
    console.log("Incoming Request Body:", req.body); // Debugging..Log the request body to check if it's correctly formatted.
    const newTodoItem = await Todo.create(req.body); // create new Todo in mongodb
    console.log("Saved Todo:", newTodoItem);
    res
      .status(201)
      .json({ message: "Todo created successfully", todo: newTodoItem }); // respond with the newly created todo
  } catch (error) {
    console.error("Error creating todo:", error); // Log error details
    res.status(500).json({ message: error.message });
  }
});

// UPDATE A TODO BASED ON ID
// app.put("/api/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params; //retrieving the id from the URL
//     const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true }); // new: true queries the db to return the updated document

//     if (!todo) {
//       return res.status(404).json({ message: "todo not found" });
//     }
//     //have it rechecked from the database.. this ensures the response contains the updated version of the document
//     //after each update, a fresh query is performed to retrieve the updated dpcument from the database
//     const updatedTodo = await Todo.findById(id);
//     res.status(200).json(updatedTodo);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// UPDATE A TODO BASED ON ID
// app.put("/api/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params; // Retrieve the todo ID from the URL
//     const { state, title, category, date, time, notes } = req.body; // Destructure request body

//     // Create an update object dynamically
//     const updateData = {};
//     if (state !== undefined) updateData.state = state;
//     if (title) updateData.title = title;
//     if (category) updateData.category = category;
//     if (date) updateData.date = date;
//     if (time) updateData.time = time;
//     if (notes) updateData.notes = notes;

//     // Update only the fields provided in req.body
//     const updatedTodo = await Todo.findByIdAndUpdate(id, updateData, {
//       new: true,
//     });

//     if (!updatedTodo) {
//       return res.status(404).json({ message: "Todo not found" });
//     }

//     res.status(200).json(updatedTodo);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// DELETE A TODO BY ID (DELETE ENDPOINT)
app.delete("/api/todos/:id", async (req, res) => {
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
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "error message" });
  }
});

// PATCH METHOD TO UPDATE COMPLETION STATUS

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
