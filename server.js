// Response code GET: 200? 204?
// Content-Type: application/json
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Spin up the server
const port = 8000;
app.listen(port, () => {
  // Callback to debug
  console.log(`Weather Journal app listening on port: ${port}`);
});

// Initialize all route with a callback function

// Get Route
app.get("/get_entries", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(projectData));
});

// Post Route
app.post("/post_entries", (req, res) => {
  console.log(req.body);
  projectData = req.body;
  // Ideally we should respont with data just saved
  res.end();
});