// Import the necessary modules

import mongoose from "mongoose";
import { connectToDatabase } from "../../pages/lib/mongodb";

// Define the schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Define the model
let Todo;

async function initDatabase() {
  // Establish a connection to the database
  const connection = await connectToDatabase();

  // Create the model using the connection object
  Todo = connection.model("Todo", todoSchema);
}

// Initialize the database connection and model
initDatabase();

// Export the model
export default Todo;
