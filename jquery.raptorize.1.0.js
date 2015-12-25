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
    var locked = false;

    function init() {
        var raptorImageMarkup = '<img id="elRaptor" src="' +
                chrome.extension.getURL('raptor.png') + '" />',
            raptorAudioMarkup = '<audio id="elRaptorShriek" preload="auto"><source src="' +
                chrome.extension.getURL('raptor-sound.mp3') + '" /><source src="' +
                chrome.extension.getURL('raptor-sound.ogg') + '" /></audio>',
            raptor,
            raptorSound;

        locked = true;

        //Append Raptor
        document.querySelector('body').innerHTML += raptorImageMarkup + raptorAudioMarkup;
        raptor = document.getElementById('elRaptor');
        raptorSound = document.getElementById('elRaptorShriek');

        //Dispose after animation
        raptor.addEventListener('animationend', function() {
            raptor.parentNode.removeChild(raptor);
            raptorSound.parentNode.removeChild(raptorSound);
        });

        //Play Sound
        raptorSound.play();

        //Animate
        raptor.style.animation = 'up-and-over 4s';
    }

    if (!locked) {
        init();
    }
}
