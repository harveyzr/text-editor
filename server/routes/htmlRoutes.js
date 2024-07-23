// Import the path module to handle file paths
const path = require('path');

// Export a function that sets up a route for the application
module.exports = (app) => {
  // Define a GET route for the root URL
  app.get('/', (req, res) => {
    // Send the index.html file located in the client/dist directory
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
};
