// Select the install button element from the DOM
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the Progressive Web App (PWA)

// Event handler for the 'beforeinstallprompt' event
// Fired when the app is ready to be installed
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default mini-infobar from appearing on mobile
    event.preventDefault();
    
    // Save the event for triggering the install prompt later
    window.deferredPrompt = event;
    
    // Show the install button to the user
    butInstall.classList.remove('hidden');
});

// Click event handler for the install button
butInstall.addEventListener('click', async () => {
    // Access the deferred prompt saved earlier
    const promptEvent = window.deferredPrompt;

    // Check if the prompt event is available
    if (!promptEvent) {
        return; // Exit if there's no prompt to show
    }
    
    // Show the install prompt to the user
    promptEvent.prompt();
    
    // Clear the deferred prompt variable as it's no longer needed
    window.deferredPrompt = null;
    
    // Hide the install button after the prompt is shown
    butInstall.classList.add('hidden');
});

// Event handler for the 'appinstalled' event
// Fired when the app has been successfully installed
window.addEventListener('appinstalled', (event) => {
    // Clear the deferred prompt variable as it's no longer needed
    window.deferredPrompt = null;
    // Optionally, you could add feedback to the user here (e.g. console log)f
    console.log('App installed successfully!');
});
