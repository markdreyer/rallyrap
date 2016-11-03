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
                'raptorizeShowImage',
                'peek-up-fade-out 9s']
    }, {
        id: 3,
        eventName: 'onStoryAssign',
        action: 'showImage',
        filters: {
            user: 'Mark Dreyer'
        },
        args: [chrome.extension.getURL('img/datayes.gif'),
                'raptorizeShowImage',
                'peek-up-fade-out 4s']
    }, {
        id: 4,
        eventName: 'onStoryAssign',
        action: 'showImageWithSound',
        filters: {
            user: 'Hunter Parks'
        },
        args: [chrome.extension.getURL('img/larrythecableguy.jpg'),
               chrome.extension.getURL('audio/gitrdone.mp3'),
                'peek-up-fade-out 4s']
    }, {
        id: 5,
        eventName: 'onStoryAssign',
        action: 'showImage',
        filters: {
            user: 'Mark Snyder'
        },
        args: [chrome.extension.getURL('img/tombstone.gif'),
                'raptorizeShowImage',
                'peek-up-fade-out 4s']
    }, {
        id: 6,
        eventName: 'onStoryAssign',
        action: 'showImage',
        filters: {
            user: 'Jason VonRuden'
        },
        args: [chrome.extension.getURL('img/sw-me.gif'),
                'raptorizeShowImage',
                'peek-up-fade-out 4s']
    }, {
        id: 7,
        eventName: 'onStoryBackTrack',
        action: 'showImageWithSound',
        args: [chrome.extension.getURL('img/soupNazi.gif'),
               chrome.extension.getURL('audio/noSoup.mp3'),
               'peek-down-quick 2s']
    }];

rallyrapEventsDOM.init();
rallyrapEvents.initHooks(rallyrapDefaultHooks);
