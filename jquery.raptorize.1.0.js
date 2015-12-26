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
var raptorizeLock;
function raptorize() {

    function init(config) {
        var imageUrl = config.useCustomImage ? config.imageUrl : chrome.extension.getURL('raptor.png'),
            raptorImageMarkup = '<img id="elRaptor" src="' + imageUrl + '" />',
            raptorAudioMarkup = '<audio id="elRaptorShriek" preload="auto"><source src="' +
                chrome.extension.getURL('raptor-sound.mp3') + '" /><source src="' +
                chrome.extension.getURL('raptor-sound.ogg') + '" /></audio>',
            raptor,
            raptorSound;

        //Append Raptor
        document.querySelector('body').innerHTML += raptorImageMarkup + raptorAudioMarkup;
        raptor = document.getElementById('elRaptor');
        raptorSound = document.getElementById('elRaptorShriek');
        if (config.useCustomImage) {
            //Override transform for custom images
            raptor.style.transform = 'rotateY(360deg)';
        }

        //Dispose after animation
        raptor.addEventListener('animationend', function() {
            raptor.parentNode.removeChild(raptor);
            raptorSound.parentNode.removeChild(raptorSound);
            raptorizeLock = false;
        });

        //Play Sound
        raptorSound.play();

        //Animate
        raptor.style.animation = 'up-and-over 4s';
    }

    if (!raptorizeLock) {
        raptorizeLock = true;

        //Load config
        chrome.storage.sync.get({
            //Defaults
            useCustomImage: false,
            imageUrl: ''
        }, function(items) {
            init(items);
        });
    }
}
