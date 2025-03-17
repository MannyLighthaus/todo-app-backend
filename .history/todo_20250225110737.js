// importing the express module from the express package.... A top level function
import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;

// MIDDLEWARE TO PARSE JSON
// middleware is a function that sits btw the incoming requests from  the clients and the resoponse sent by the server.
app.use(express.json());

// Connect to MongoDB
// mongoose
//   .connect(
//     "mongodb+srv://manny:8gwXrEiarointZst@backenddb.tkrlx.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
//   )
//   .then(() => {
//     console.log("Connected to database");
//     // Start the server only after the database connection is established
//     // the .listen method allows us to listen to the port for incoming requests
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log(`Error: ${err}`); // Corrected template literal syntax
//   });

//Route
// GET ALL TODOS
app.get("/api/todos", async (req, res) => {
  try {
    const getTodos = await Todo.find({});
    res.status(200).json(getTodos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET A SINGLE TODO BY ID
app.get("/api/person/:id", async (req, res) => {
  try {
    const {id} = req.params;  // extract the id from the request (URL parameter)
    const person = await Person.findById(id)
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// GET PERSON BY ID
app.get("/api/person/:id", async (req, res) => {
  try {
    const { id } = req.params; // extract the id from the request (URL parameter)
    const person = await Person.findById(id); // query Mondodb and search for person by id
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});