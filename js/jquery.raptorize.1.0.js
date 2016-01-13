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
        var imageUrl = config.useCustomImage ? config.imageUrl : chrome.extension.getURL('img/raptor-nye.png'),
            audioUrl = chrome.extension.getURL('audio/raptor-sound.mp3'),
            audioUrlOgg = chrome.extension.getURL('audio/raptor-sound.ogg'),
            raptorizeEl = getRaptorizeElement(imageUrl, audioUrl, audioUrlOgg),
            raptor = raptorizeEl.querySelector('#elRaptor');

        //Append Raptor
        document.body.appendChild(raptorizeEl);

        //Dispose after animation
        raptor.addEventListener('animationend', function() {
            document.body.removeChild(raptorizeEl);
            raptorizeLock = false;
        });

        //Play Sound
        raptorizeEl.querySelector('#elRaptorShriek').play();

        //Animate
        raptor.style.animation = 'up-and-over 4s';
    }

    function getRaptorizeElement(imageUrl, audioUrl, audioUrlOgg) {
        var raptorize = document.createElement('span'),
            source = document.createElement('source'),
            sourceOgg = document.createElement('source'),
            image = document.createElement('img'),
            audio = document.createElement('audio');
        image.setAttribute('id', 'elRaptor');
        image.setAttribute('src', imageUrl);

        audio.setAttribute('id', 'elRaptorShriek');
        audio.setAttribute('preload', 'auto');

        source.setAttribute('src', audioUrl);
        sourceOgg.setAttribute('src', audioUrlOgg);
        audio.appendChild(source);
        audio.appendChild(sourceOgg);

        raptorize.appendChild(image);
        raptorize.appendChild(audio);

        return raptorize;
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
