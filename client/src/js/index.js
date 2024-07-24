// Import necessary modules
import { Workbox } from 'workbox-window'; // Import Workbox for service worker management
import Editor from './editor'; // Import the Editor class
import './database'; // Import database functionality
import '../css/style.css'; // Import CSS styles

// Select the main element from the DOM
const main = document.querySelector('#main');
// Clear any existing content in the main element
main.innerHTML = '';

// Function to display a loading spinner while the editor is being initialized
const loadSpinner = () => {
  // Create a new div element for the spinner
  const spinner = document.createElement('div');
  spinner.classList.add('spinner'); // Add spinner class for styling
  // Set the inner HTML to include the loading spinner structure
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
    </div>
  `;
  // Append the spinner to the main element
  main.appendChild(spinner);
};

// Initialize the Editor instance
const editor = new Editor();

// Check if the editor was successfully created
if (typeof editor === 'undefined') {
  // If the editor is undefined, show the loading spinner
  loadSpinner();
}

// Check if the browser supports service workers
if ('serviceWorker' in navigator) {
  // Create a new Workbox instance with the service worker file
  const workboxSW = new Workbox('/src-sw.js');
  // Register the service worker
  workboxSW.register();
} else {
  // Log an error message if service workers are not supported
  console.error('Service workers are not supported in this browser.');
}
