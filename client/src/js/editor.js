// Import methods to save and retrieve data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

// Define the main class for the editor functionality
export default class Editor {
  constructor() {
    // Retrieve any previously stored content from localStorage
    const localData = localStorage.getItem('content');

    // Check if CodeMirror is loaded; if not, throw an error
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    // Initialize the CodeMirror editor with specified options
    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // Load data from IndexedDB and set it in the editor
    this.loadEditorContent(localData);

    // Save content to localStorage on editor change
    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save content to IndexedDB when the editor loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }

  // Method to load content into the editor
  async loadEditorContent(localData) {
    try {
      const data = await getDb();
      console.info('Loaded data from IndexedDB, injecting into editor');
      // Set the editor's value to data from IndexedDB, localStorage, or fallback to header
      this.editor.setValue(localData || data || header);
    } catch (error) {
      console.error('Error loading data from IndexedDB:', error);
      // Fallback to header if there's an error
      this.editor.setValue(header);
    }
  }
}
