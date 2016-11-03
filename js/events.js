
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
         if (this.hooks[i].eventName === eventName)
         {

           if (attributes)
           {
              if (!this.hooks[i].filters) { continue; }
              if (attributes.user && attributes.user !== this.hooks[i].filters.user) {continue;}
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
    },
    addHook: function(newHook) {
        var maxId = 0;

        this.hooks.forEach(function(item, index, array) {
            if (item.id > maxId) maxId = item.id;
        });

        newHook.id = maxId++;

        this.hooks.push(newHook);
    },
    deleteHook: function(hookId) {
      var hookIndex = this.getHookIndexById(hookId);
        if (hookIndex > -1) {
            console.log('Deleted Hook:');
            console.log(this.hooks.splice(hookIndex, 1));
        } else {
          console.log('Warning: tried to delete hook, but it was not found: hookId:' + hookId);
        }
    },

    getHookIndexById: function(hookId) {
      var foundIndex = -1;
        for (var i = 0, len = this.hooks.length; i < len; i++) {
          if (this.hooks[i].id === hookId) {
              foundIndex = i;
              break;
          }
        }
        return foundIndex;
    }
};
