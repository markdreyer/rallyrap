$(function() {
    var viewport = document.getElementById('viewport');
    if (viewport) {

        /**
         * Listener for moving a task.
         */
        viewport.addEventListener('mouseup', function(e) {
            var numberOfColumns = $('.rally-drop-indicator').parents('tr').children('td.card-column').length,
                toIndex = $('.rally-drop-indicator').parents('td').index(),
                fromIndex = $('.dragged-card').parents('td').index();
            console.log('RallyRap: column fromIndex=' + fromIndex);
            console.log('RallyRap: column toIndex=' + toIndex);
            if (toIndex >= 0) {
                if (toIndex === numberOfColumns - 1) {
                    raptorize();
                } else if (toIndex < fromIndex) {
                    //Task moved back
                    raptorNoSoup();
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
                    console.log('RallyRap: blocked');
                    raptorBlock();
                  }
              }
        });
    }

    /**
     * Listener for assigning a task to a user.
     * Listen on body since rally pop-overs are at the body level
     * TODO: Config this out using a list of action/name settings
     */
    $('body').on('click', 'div.rly-popover', function() {

      //Assigned a task to Mark
      if ($(this).find('div.x4-boundlist-selected:contains("Mark")')[0]) {
          console.log('RallyRap: Assigned to user: Mark');
          raptorMakeMyDay();
      }
    });

}
);
