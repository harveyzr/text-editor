# SVG LOGO MAKER

## Table of Contents

 - [Description](#description)
 - [User Story](#user-story)
 - [Acceptance Criteria](#acceptance-criteria)
 - [Getting Started](#getting-started)
 - [Images](#images)
 - [Link To Recorded Video](#link-to-recorded-video)
 - [Link to GitHub Pages ](#link-to-gethub-website)
 - [Skills Used](#skills-used)

 ## Description
The Text Editor project is a Progressive Web Application (PWA) designed to function as a robust text editor that operates seamlessly in the browser. This application is a single-page application (SPA) that meets PWA criteria, ensuring it can work offline and utilize various data persistence techniques for reliability.


## User Story
As a developer, I want to create notes or code snippets with or without an internet connection so that I can reliably retrieve them for later use.
 
 ## Acceptance Criteria
The application must meet the following criteria:
- Folder Structure: When the application is opened in the editor, a client-server folder structure should be visible.
- Start Application: Running npm run start from the root directory should start the backend and serve the client.
- Bundling: The JavaScript files must be bundled using Webpack when the text editor application is run from the terminal.
- Webpack Plugins: Running Webpack plugins should generate an HTML file, service worker, and a manifest file.
- Next-Gen JavaScript: The application should function without errors in the browser when using modern JavaScript features.
- IndexedDB: Upon opening the text editor, an IndexedDB database should be created immediately.
- Content Saving: Content entered in the text editor should be saved in IndexedDB when the user clicks off the DOM window.
- Content Retrieval: When reopening the text editor, the previously saved content should be retrieved from IndexedDB.
- Install Button: Clicking the Install button should allow the user to download the web application as an icon on their desktop.
- Service Worker: The web application should have a registered service worker using Workbox.
- Static Assets Caching: Static assets should be pre-cached upon loading, along with subsequent pages and static assets.
Deployment: The application should be deployable to Render with proper build scripts for a Webpack application.

## Getting Started
- Clone the Starter Code: Ensure you clone the starter code repository and create your own repository with the starter code. Do not fork the starter code repository.
- Install Dependencies: Navigate to the project directory and run npm install to install the necessary dependencies.
- Run the Application: Use npm run start to start the application and access it in your browser.

## Link to GetHub Website
https://github.com/harveyzr/text-editor




