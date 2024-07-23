// Import the Express framework
const express = require('express');

// Create an instance of an Express application
const app = express();

// Define the port to listen on, using the environment variable or defaulting to 3000
const PORT = process.env.PORT || 3000;

// Middleware to serve static files from the client/dist directory
app.use(express.static('../client/dist'));

// Middleware to parse URL-encoded data with extended options
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data
app.use(express.json());

// Import and use the HTML routes
require('./routes/htmlRoutes')(app);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Now listening on port: ${PORT}`);
});
