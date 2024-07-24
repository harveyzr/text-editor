// Import the path module to handle file paths
const path = require('path');

// Export a function that sets up routes for the application
module.exports = (app) => {
  // Define a GET route for the root URL
  app.get('/', (req, res) => {
    // Construct the path to the index.html file in the client/dist directory
    const indexPath = path.join(__dirname, '../client/dist/index.html');
    
    // Send the index.html file as a response
    res.sendFile(indexPath);
  });
};
