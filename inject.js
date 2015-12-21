// chrome.browserAction.onClicked.addListener(function(tab) {
	// raptorize();
// });

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: 'raptorize()'
  });
});

chrome.webNavigation.onCompleted.addListener(function(details) {
    chrome.tabs.executeScript(details.tabId, {
        file: 'rallyrap.js'
    });
}, {
    url: [{
        // Runs on example.com, example.net, but also example.foo.com
        hostContains: '.rallydev.'
    }]
});	