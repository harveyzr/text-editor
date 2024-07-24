// Import methods for saving and retrieving data from the IndexedDB database
import { getDb, putDb } from './database'; // Functions to interact with the database
import { header } from './header'; // Fallback content for the editor

// Define the main class for the editor functionality
export default class Editor {
  constructor() {
    // Retrieve previously stored content from localStorage
    const localData = localStorage.getItem('content');

    // Ensure CodeMirror library is loaded; otherwise, throw an error
    this.checkCodeMirrorLoaded();

    // Initialize the CodeMirror editor with specified configuration options
    this.initializeEditor();

    // Attempt to load content into the editor from different sources
    this.loadEditorContent(localData);

    // Set up event listener to save content to localStorage on editor change
    this.setupLocalStorageSave();

    // Set up event listener to save content to IndexedDB on editor blur (loss of focus)
    this.setupDatabaseSaveOnBlur();
  }

  // Method to check if CodeMirror is loaded
  checkCodeMirrorLoaded() {
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }
  }

  // Method to initialize the CodeMirror editor
  initializeEditor() {
    // Create a new CodeMirror editor instance with specific options
    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '', // Initial content of the editor
      mode: 'javascript', // Set the mode for JavaScript syntax highlighting
      theme: 'monokai', // Set the theme for the editor
      lineNumbers: true, // Display line numbers
      lineWrapping: true, // Enable line wrapping
      autofocus: true, // Automatically focus the editor
      indentUnit: 2, // Set indentation size
      tabSize: 2, // Set tab size
    });
  }

  // Method to load content into the editor from various sources
  async loadEditorContent(localData) {
    try {
      // Retrieve data from IndexedDB
      const data = await getDb();

      console.info('Loaded data from IndexedDB, injecting into editor');

      // Set the editor's value to data from IndexedDB, localStorage, or fallback to header content
      this.editor.setValue(localData || data || header);
    } catch (error) {
      // Log error if loading data fails
      console.error('Error loading data from IndexedDB:', error);

      // Fallback to header content in case of error
      this.editor.setValue(header);
    }
  }

  // Method to save content to localStorage when the editor content changes
  setupLocalStorageSave() {
    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });
  }

  // Method to save content to IndexedDB when the editor loses focus
  setupDatabaseSaveOnBlur() {
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content')); // Save current content to IndexedDB
    });
  }
}
