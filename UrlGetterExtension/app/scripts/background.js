chrome.runtime.onInstalled.addListener((details) => {
    console.log('previousVersion', details.previousVersion)
});

console.log('Event Page for Page Action');
