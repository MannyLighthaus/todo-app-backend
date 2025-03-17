import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Todo Title"],
  },
  category: {
    type: String,
    enum: ["Sport", "Goal", "Appointment"],
  },
});
