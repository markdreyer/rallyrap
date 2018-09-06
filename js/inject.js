var background = {
    init: function() {
        chrome.browserAction.onClicked.addListener(function(tab) {
          chrome.tabs.executeScript({
            code: 'try {' +
                    'rallyrapEvents.executeHooks(\'onStoryCompleted\');' +
                  '} catch(err) {' +
                    'window.alert(\"Raptorize for Rally: Something went wrong. To respect your privacy, this extension only runs on rallydev.com websites.\");' +
                  '}'
          });
        });
    }
};

background.init();

