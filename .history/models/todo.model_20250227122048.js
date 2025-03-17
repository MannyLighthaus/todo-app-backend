import mongoose from "mongoose";

// define categroy schema to match  frontend
const CategorySchema = new mongoose.Schema({
  id: {
    type: String,
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
    id: {
      type: Number,
      unique: true, // means no todo should hare same id with another.
    },

    title: {
      type: String,
      required: [true, "Please enter Todo Title"],
    },
    category: {
      type: String,
      enum: ["task", "goal", "appointment"], // predefined category.. enum allows for specific predfined fields
    },
    date: {
      type: String,
      // required: [true, "Please enter a date"],
    },
    time: {
      type: String,
      // required: [true, "Please enter a time"],
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // automatcially adds `createdAt` and `updatedAt` fields
  }
);

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
