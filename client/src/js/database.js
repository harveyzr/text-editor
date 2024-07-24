// Import the openDB function from the idb library to interact with IndexedDB
import { openDB } from 'idb';

// Function to initialize the IndexedDB database
const initdb = async () => {
  // Open a database named 'JATE' with version 1
  openDB('JATE', 1, {
    // Upgrade function to set up the database schema
    upgrade(db) {
      // Check if the object store 'JATE' already exists
      if (db.objectStoreNames.contains('JATE')) {
        console.log('JATE database already exists'); // Log if the database exists
        return; // Exit the function if the database is already set up
      }
      // Create a new object store named 'JATE' with 'id' as the key path that auto-increments
      db.createObjectStore('JATE', { keyPath: 'id', autoIncrement: true });
      console.log('JATE database created'); // Log the creation of the database
    },
  });
};

// Function to add or update data in the database
export const putDb = async (content) => {
  console.log(content); // Log the content being saved to the database
  
  // Create a connection to the 'JATE' database
  const jateDb = await openDB('JATE', 1);
  
  // Create a new transaction for the 'JATE' object store with read/write permissions
  const tx = jateDb.transaction('JATE', 'readwrite');
  
  // Open the object store for the transaction
  const store = tx.objectStore('JATE');
  
  // Use the .put() method to add or update the content in the object store
  const request = store.put({ content, id: 1 });
  
  // Wait for the request to complete and log the result
  const result = await request;
  console.log('🚀 - data saved to the database', result); // Log the result of the save operation
};

// Function to retrieve data from the database
export const getDb = async () => {
  // Create a connection to the 'JATE' database
  const jateDb = await openDB('JATE', 1);
  
  // Create a new transaction for the 'JATE' object store with read-only permissions
  const tx = jateDb.transaction('JATE', 'readonly');
  
  // Open the object store for the transaction
  const store = tx.objectStore('JATE');
  
  // Use the .get() method to retrieve the data with id 1
  const request = store.get(1);

  // Wait for the request to complete and log the result
  const result = await request;
  console.log('result.value', result); // Log the retrieved data
  return result; // Return the retrieved data
};

// Initialize the database when the script is loaded
initdb();
