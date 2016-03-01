$(function() {

    var hooks = [
        { eventName: "onStoryBlock", action: "raptorBlock()" },
        { eventName: "onStoryAssign", action: "raptorMakeMyDay();", filters: { user: "Mark Dreyer" } },
        { eventName: "onStoryAssign", action: "raptorTombstone();", filters: { user: "Mark Snyder" } },
        { eventName: "onStoryBackTrack", action: "raptorNoSoup();" }
    ];

    rallyrapEventsDOM.init();
    rallyrapEvents.initHooks(hooks);
}
);
