$(function() {
    var viewport = document.getElementById('viewport');
    if (viewport) {
        viewport.addEventListener('mouseup', function(e) {
            var isAtnaBoard = $('th:contains("Excelsior!")'),
                index = $('.rally-drop-indicator').parents('td').index();
            console.log('RallyRap: column index=' + index);
            if (isAtnaBoard && index === 5) {
                raptorize();
            }
        });


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

}
);
