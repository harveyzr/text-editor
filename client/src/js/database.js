import { openDB } from 'idb';

// Function to initialize the database
const initdb = async () => {
  // Creating a new database named 'JATE' with version 1
  openDB('JATE', 1, {
    // Upgrade function to set up the database schema
    upgrade(db) {
      if (db.objectStoreNames.contains('JATE')) {
        console.log('JATE database already exists');
        return;
      }
      // Create a new object store with 'id' as the key path that auto-increments
      db.createObjectStore('JATE', { keyPath: 'id', autoIncrement: true });
      console.log('JATE database created');
    },
  });
};

// Function to add or update data in the database
export const putDb = async (content) => {
  console.log(content); // Log the content being put to the database
  
  // Create a connection to the database
  const jateDb = await openDB('JATE', 1);
  
  // Create a new transaction with read/write permissions
  const tx = jateDb.transaction('JATE', 'readwrite');
  
  // Open the object store
  const store = tx.objectStore('JATE');
  
  // Use the .put() method to add or update the content
  const request = store.put({ content, id: 1 });
  
  // Wait for the request to complete and log the result
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// Function to retrieve data from the database
export const getDb = async () => {
  // Create a connection to the database
  const jateDb = await openDB('JATE', 1);
  
  // Create a new transaction with read-only permissions
  const tx = jateDb.transaction('JATE', 'readonly');
  
  // Open the object store
  const store = tx.objectStore('JATE');
  
  // Use the .get() method to retrieve the data
  const request = store.get(1);

  // Wait for the request to complete and log the result
  const result = await request;
  console.log('result.value', result);
  return result; // Return the retrieved data
};

// Initialize the database
initdb();
