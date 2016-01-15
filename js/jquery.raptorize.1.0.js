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

/**
 * Creates an image on the screen with animation. The image is destroyed
 * after animation has completed.
 *
 * @param  {string} imagePath Relative path to the image resource.
 * @param  {string} imageId Id to use when creating the image tag. This needs to be
 *                          unique across all of rally's ID's.
 * @param  {string} animationClass CSS class to use for the animation.
 */
function showImage(imagePath, imageId, animationClass) {
    var imageSrc = chrome.extension.getURL(imagePath),
        imageEl = createImageEl(),
        noblock = imageEl.querySelector('#' + imageId);

    //Append image
    document.body.appendChild(imageEl);

    //Dispose image
    noblock.addEventListener('animationend', function() {
        document.body.removeChild(imageEl);
    });

    //Animate
    noblock.style.animation = animationClass;

    /**
     * Creates a new image element wrapped in a span on the document.
     * @return {Element} The created span element object.
     */
    function createImageEl()
    {
        var span = document.createElement('span');
        var image = document.createElement('img');
        image.setAttribute('id', imageId);
        image.setAttribute('src', imageSrc);
        span.appendChild(image);
        return span;
    }
}

var raptorizeLock;
function raptorize() {

    function init(config) {
        var imageUrl = config.useCustomImage ? config.imageUrl : chrome.extension.getURL('img/superman.png'),
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
