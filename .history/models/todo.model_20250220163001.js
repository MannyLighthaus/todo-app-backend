import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Todo Title"],
  },
  category: {
    type: String,
    enum: ["Sport", "Goal", "Appointment"], // predefined category.. enum allows for specific predfined fields
  },
  date: {
    type: Date,
    required: [true, "Please enter a date"],
  },
  time: {
    type: String,
  },
});
