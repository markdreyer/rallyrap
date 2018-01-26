var layerer = {
    ageCards: function (useAgeAccentuator, ageBreakPoints) {
        if (!useAgeAccentuator) return;

        var breaks = ageBreakPoints.split(',');
        if (breaks.length < 4) {
            console.log('layerer.ageCards: age break points were messed!  Must be 4 but were: ' + ageBreakPoints);
            return;
        }

        var theCards = $('div.rui-card');

        $.each(theCards, function (index, value) {
            var age = '0';
            var days = $(value).find('div.age:first');
            if (days.length == 1) {
                age = days[0].innerText.replace('days', '').trim();
            }

            // Set shared styles for anything > the first card age
            if (parseInt(age) > breaks[0]) {
                $(value).css('border', '0px');
                $(value).css('-webkit-box-shadow', '#d6d6d6 0px 0px;');
                $(value).css('box-shadow', '#d6d6d6 0px 0px;');

                $(value).css('background-size', '100% 100%');
                $(value).css('background-repeat', 'no-repeat');
                $(value).css('background-position', 'center center');
                $(days[0]).css('color', 'red');
            }

            // Progressively set the image, and add a pulsate for the oldest card age break point
            if (parseInt(age) > breaks[3]) {
                $(value).css('background-image', 'url(' + chrome.extension.getURL('img/WeatheredPaper4.jpg') + ')');
                $(days[0]).effect('pulsate', {}, 800);
            } else if (parseInt(age) > breaks[2]) {
                $(value).css('background-image', 'url(' + chrome.extension.getURL('img/WeatheredPaper3.jpg') + ')');
            } else if (parseInt(age) > breaks[1]) {
                $(value).css('background-image', 'url(' + chrome.extension.getURL('img/WeatheredPaper2.jpg') + ')');
            } else if (parseInt(age) > breaks[0]) {
                $(value).css('background-image', 'url(' + chrome.extension.getURL('img/WeatheredPaper1.jpg') + ')');
            }
        });
    },
};