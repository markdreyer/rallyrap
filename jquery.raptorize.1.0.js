/*
 * BASED OFF OF:
 * http://zurb.com/playground/jquery-raptorize
 *
 * jQuery Raptorize Plugin 1.0
 * www.ZURB.com/playground
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

    function raptorize() {

            //Raptor Vars
            var raptorImageMarkup = '<img id="elRaptor" style="display: none" src="' +
                chrome.extension.getURL('raptor.png') + '" />';
            var raptorAudioMarkup = '<audio id="elRaptorShriek" preload="auto"><source src="' +
                chrome.extension.getURL('raptor-sound.mp3') + '" /><source src="' +
                 chrome.extension.getURL('raptor-sound.ogg') + '" /></audio>';
            var locked = false;

            //Append Raptor and Style
            $('body').append(raptorImageMarkup);
            $('body').append(raptorAudioMarkup);
            var raptor = $('#elRaptor').css({
                'position': 'fixed',
                'bottom': '-700px',
                'right' : '0',
                'display' : 'block',
                'z-index' : '99999'
            });

            // Animating Code
            function init() {

                locked = true;

                //Sound Hilarity
                function playSound() {
                    document.getElementById('elRaptorShriek').play();
                }
                playSound();

                // Movement Hilarity
                raptor.animate({
                    'bottom' : '0'
                }, function() {
                    $(this).animate({
                        'bottom' : '-130px'
                    }, 100, function() {
                        var offset = (($(this).position().left) + 400);
                        $(this).delay(300).animate({
                            'right' : offset
                        }, 2200, function() {
                            raptor = $('#elRaptor').css({
                                'bottom': '-700px',
                                'right' : '0'
                            });
                            locked = false;
                        });
                    });
                });
            }

            if (!locked) {
                init();
            }
    }//orbit plugin call

