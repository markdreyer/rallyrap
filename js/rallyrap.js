$(function() {

    var hooks = [
        { eventName: "onStoryUnBlock", action: "raptorUnBlock()" },
        { eventName: "onStoryAssign", action: "raptorMakeMyDay();", filters: { user: "Mark Dreyer" } },
        { eventName: "onStoryAssign", action: "raptorTombstone();", filters: { user: "Mark Snyder" } },
        { eventName: "onStoryAssign", action: "raptorHan();", filters: { user: "Jason VonRuden" } },
        { eventName: "onStoryBackTrack", action: "raptorNoSoup();" }
    ];

    rallyrapEventsDOM.init();
    rallyrapEvents.initHooks(hooks);
}
);
