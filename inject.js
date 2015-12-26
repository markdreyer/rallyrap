var background = {
    init: function() {
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
                // Runs on rallydev.com, rallydev.net, but also rallydev.foo.com
                hostContains: '.rallydev.'
            }]
        });
    }
};

background.init();

