$(function() {

    var hooks = [
        { eventName: 'onStoryCompleted', action: 'raptorize' },
        { eventName: 'onStoryUnBlock', action: 'unBlock' },
        { eventName: 'onStoryAssign', action: 'makeMyDay', filters: { user: 'Mark Dreyer' } },
        { eventName: 'onStoryAssign', action: 'tombstone', filters: { user: 'Mark Snyder' } },
        { eventName: 'onStoryAssign', action: 'han', filters: { user: 'Jason VonRuden' } },
        { eventName: 'onStoryBackTrack', action: 'noSoup' }
    ];

    rallyrapEventsDOM.init();
    rallyrapEvents.initHooks(hooks);
}
);
