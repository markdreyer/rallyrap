var rallyrapDefaultHooks =
    [{
        id: 1,
        eventName: 'onStoryCompleted',
        action: 'raptorize',
        args: ['audio/lalala.mp3']
    }, {
        id: 2,
        eventName: 'onStoryUnBlock',
        action: 'showImage',
        args: [chrome.extension.getURL('img/TurboSnail.gif'),
                'rallyrapImageId-2',
                'peek-up-fade-out 9s']
    }, {
        id: 3,
        eventName: 'onStoryAssign',
        action: 'showImageWithSound',
        filters: {
            user: 'Hunter Parks'
        },
        args: [chrome.extension.getURL('img/larrythecableguy.jpg'),
               chrome.extension.getURL('audio/gitrdone.mp3'),
                'peek-up-fade-out 4s']
    }, {
        id: 4,
        eventName: 'onStoryAssign',
        action: 'showImage',
        filters: {
            user: 'Mark Snyder'
        },
        args: [chrome.extension.getURL('img/tombstone.gif'),
                'rallyrapImageId-4',
                'peek-up-fade-out 4s']
    }, {
        id: 5,
        eventName: 'onStoryAssign',
        action: 'showImage',
        filters: {
            user: 'Jason VonRuden'
        },
        args: [chrome.extension.getURL('img/sw-me.gif'),
                'rallyrapImageId-5',
                'peek-up-fade-out 4s']
    }];

//Initialize Rallyrap
chrome.storage.sync.get({
        //Defaults
        customHooksFile: ''
    }, function(items) {

        rallyrapEventsDOM.init();
        if (items.customHooksFile) {
            rallyrapEvents.initHooks(JSON.parse(items.customHooksFile));
        } else {
            rallyrapEvents.initHooks(rallyrapDefaultHooks);
        }

    });

