// Import the Express framework to create a server
const express = require('express');

// Create an instance of an Express application
const app = express();

// Define the port to listen on.
// It checks for an environment variable, if not found, it defaults to port 3000
const PORT = process.env.PORT || 3000;

// Middleware to serve static files from the 'client/dist' directory
// This allows serving HTML, CSS, JS, and other assets directly
app.use(express.static('../client/dist'));

// Middleware to parse URL-encoded data from incoming requests
// This is typically used for form submissions
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data from incoming requests
// This is useful for handling API requests with JSON payloads
app.use(express.json());

// Import the HTML routes and pass the Express app instance to it
// This allows the application to respond to specific HTML route requests
require('./routes/htmlRoutes')(app);

// Start the server and listen on the specified port
// A callback function logs a message when the server is successfully running
app.listen(PORT, () => {
  console.log(`Now listening on port: ${PORT}`);
});
