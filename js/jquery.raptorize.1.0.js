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
 * @param  {string} imageSrc URL of the image resource.
 * @param  {string} imageId Id to use when creating the image tag. This needs to be
 *                          unique across all of rally's ID's.
 * @param  {string} animationClass CSS class to use for the animation.
 */
function showImage(imageSrc, imageId, animationClass) {
    var imageEl = createImageEl(),
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

/**
 * Creates an audio element on the document and plays it.
 * @param  {string} elementId Identifier of the audio element to be created.
 * @param  {string[]/string} soundPaths Array of sound paths to use for the source tags. If more than one
 *                                      source is used, the browser will pick whatever format it likes best.
 */
function playSound(elementId, soundPaths) {
    var audio = document.createElement('audio');

        audio.setAttribute('id', elementId);
        audio.setAttribute('preload', 'auto');

        if (typeof(soundPaths) === 'string') {
            soundPaths = [soundPaths];
        }

        for (var i = 0; i < soundPaths.length; i++) {
            source = document.createElement('source');
            source.setAttribute('src', soundPaths[i]);
            audio.appendChild(source);
        }

        audio.play();
}

/**
 * Unleash the Beast!
 */
function raptorize() {

    //Load config
    chrome.storage.sync.get({
        //Defaults
        useCustomImage: false,
        useCustomSound: false,
        imageUrl: '',
        soundUrl: ''
    },
        /**
         * Runs the raptorize functionality. This will animate an image and play
         * a sound.
         * @param  {object} config Configuration object as returned by chrome storage API.
         */
        function run(config) {
            var imageUrl = config.useCustomImage ? config.imageUrl : chrome.extension.getURL('img/superman.png'),
                soundUrl = config.useCustomSound ? config.soundUrl :
                            [chrome.extension.getURL('audio/raptor-sound.mp3'),
                             chrome.extension.getURL('audio/raptor-sound.ogg')];

            showImage(imageUrl, 'elRaptor', 'up-and-over 4s');

            playSound('elRaptorShriek', soundUrl);
        }
    );
}
