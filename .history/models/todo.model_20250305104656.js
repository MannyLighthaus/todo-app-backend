import mongoose from "mongoose";

// define category schema to match  frontend
const CategorySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter Todo Title"],
    },
    category: {
      type: CategorySchema,
    },
    date: {
      type: String,
      required: [true, "Please enter a date"],
    },
    time: {
      type: String,
      required: [true, "Please enter a time"],
    },
    notes: {
      type: String,
      default: "",
      required: false,
    },
    state: {
      type: Number,
      default: 1, // default is 1 for incomplete list
    },
  }
  // {
  //   timestamps: true, // automatcially adds `createdAt` and `updatedAt` fields
  // }
);

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
