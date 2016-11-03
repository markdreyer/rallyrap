var background = {
    init: function() {
        chrome.browserAction.onClicked.addListener(function(tab) {
          chrome.tabs.executeScript({
            code: 'try {' +
                    'rallyrapEvents.executeHooks(\'onStoryCompleted\');' +
                  '} catch(err) {' +
                    'window.alert(\"Raptorize for Rally: Please reload the current page.\");' +
                  '}'
          });
        });
    }
};

background.init();

