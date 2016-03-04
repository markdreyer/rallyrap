

var rallyrapEventsDOM =
{

  init: function()
  {

      console.debug('dom hooks initiated');
      var viewport = document.getElementById('viewport');
      if (viewport) {

        /**
         * Listener for moving a task.
         */
        viewport.addEventListener('mouseup', function(e) {
            var numberOfColumns = $('.rally-drop-indicator').parents('tr').children('td.card-column').length,
                toIndex = $('.rally-drop-indicator').parents('td').index(),
                fromIndex = $('.dragged-card').parents('td').index();
            if (toIndex >= 0) {
                if (toIndex === numberOfColumns - 1 && numberOfColumns > 2) {
                    rallyrapEvents.onStoryCompleted();
                } else if (toIndex < fromIndex) {
                    //Task moved back
                    rallyrapEvents.onStoryBackTrack();
                }
            }
        });

        /**
         * Listener for blocking a task.
         */
          viewport.addEventListener('click', function(e) {
            var target = $(e.target);

                /* On click of the blocked button */
                if (target.hasClass('icon-blocked'))
                {
                    /* If this is not - unblock */
                    if (target.hasClass('rly-active') === false)
                    {
                      rallyrapEvents.onStoryBlock();

                    }
                    else {
                      rallyrapEvents.onStoryUnBlock();  
                    }
                }
          });
      }


      /* Listener for assigning a task to a user.
      */
     $('body').on('click', 'div.rly-popover', function() {
       var userField = $(this).find('div.x4-boundlist-selected')[0];

       if(userField)
       {
          var userName = $(userField).find('span').first().html();
          rallyrapEvents.onStoryAssign(userName);
       }

     });

  }
};
