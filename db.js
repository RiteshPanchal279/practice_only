const mongoose = require("mongoose");
require("dotenv").config();

// mongoDB name conveition
/*
   SQL ||  MongoDB
Database -> Database
Table  -> Collection
Row   ->  Document
Column  -> Field 
 */

// Define the MongoDB connection URL

// const mongoURL = process.env.MONGODB_URL_LOCAL; //local 
const mongoURL = process.env.MONGODB_URL; //from server
  
// Set up MongoDB connection
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

// Define event listener for database connection

db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

db.on("error", (err) => {
  console.log(" MongoDB connection Error:", err);
});

db.on("disconnected", () => {
  console.log("Disconnected MongoDB server");
});

// Export the databes connection
module.exports = db;
