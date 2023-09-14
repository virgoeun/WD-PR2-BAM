// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

// const MONGO_URL = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hugger-project";
const MONGODB_URI = process.env.MONGODB_URL;

//connect DB
async function connectDB() {
  await mongoose
    .connect(MONGODB_URI)
    .then((response) => {
      console.info(
        "connected MongoDB | DATABASE:",
        response.connections[0].name
      );
    })
    .catch((error) => {
      console.error("Failed to connect to MongoDB | error:", error);
      process.exit(1);
    });
}

//process.exit(1)
//a command used in Node.js to forcefully terminate the current process
// with an exit code of 1. In this context, it's typically used
// when an error occurs during the execution of a Node.js script to
// indicate that the script has encountered an error and
// is exiting with a non-zero exit code to signal failure.

//disconect DB
function closeDB() {
  mongoose
    .disconnect()
    .then(() => console.info("disconnected MongoDB"))
    .catch((err) => {
      console.error("Failed to disconnect", err);
      process.exit(1);
    });
}

module.exports = { connectDB, closeDB };
