import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    name: {
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
    description: {
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
