

var rallyrapEvents = {

    hooks: [],

    initHooks: function(myHooks)
    {
        this.hooks = myHooks;
    },

    onStoryBlock: function()
    {
      this.executeHooks('onStoryBlock');
    },

    onStoryUnBlock: function()
    {
      this.executeHooks('onStoryUnBlock');
    },

    onStoryAssign: function(user)
    {
      this.executeHooks('onStoryAssign', { user: user });
    },

    onStoryBackTrack: function()
    {
      this.executeHooks('onStoryBackTrack');
    },

    onStoryCompleted: function()
    {
      this.executeHooks('onStoryCompleted');
    },

    filterHooks: function(eventName, attributes)
    {
      var filtered = [];

      for (i = 0; i < this.hooks.length; i++) {
         if (this.hooks[i].eventName == eventName)
         {

           if (attributes)
           {
              if (!this.hooks[i].filters) { continue; }
              if (attributes.user && attributes.user != this.hooks[i].filters.user) {continue;}
           }

           filtered.push(this.hooks[i]);

         }
      }
      return filtered;
    },

    executeHooks: function(eventName, attributes)
    {
       var filtered = this.filterHooks(eventName, attributes);

       for (i = 0; i < filtered.length; i++) {
          raptorizeActions[filtered[i].action].apply(this, filtered[i].args);
       }
    }
};
