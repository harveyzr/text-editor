// Select the install button element from the DOM
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the Progressive Web App (PWA)

// Event handler for the 'beforeinstallprompt' event
// This event is fired when the app is ready to be installed
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default mini-infobar from appearing on mobile
    event.preventDefault();
    
    // Stash the event so it can be triggered later
    window.deferredPrompt = event;
    
    // Show the install button
    butInstall.classList.remove('hidden');
});

// Click event handler for the install button
butInstall.addEventListener('click', async () => {
    // Check if the deferred prompt is available
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return; // Exit if there's no prompt to show
    }
    
    // Show the install prompt to the user
    promptEvent.prompt();
    
    // Clear the deferred prompt variable
    window.deferredPrompt = null;
    
    // Hide the install button after the prompt is shown
    butInstall.classList.add('hidden');
});

// Event handler for the 'appinstalled' event
// This event is fired when the app has been successfully installed
window.addEventListener('appinstalled', (event) => {
    // Clear the deferred prompt variable as it's no longer needed
    window.deferredPrompt = null;
});
