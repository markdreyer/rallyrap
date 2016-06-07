var background = {
    init: function() {
        chrome.browserAction.onClicked.addListener(function(tab) {
          chrome.tabs.executeScript({
            code: 'rallyrapEvents.executeHooks(\'onStoryCompleted\')'
          });
        });
    }
};

background.init();