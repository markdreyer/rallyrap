// Saves options to chrome.storage.sync.
function save_options() {
    var raptorizeImageUrlSelect = document.getElementById('raptorizeImageUrl');
	var raptorizeAudioUrlSelect = document.getElementById('raptorizeAudioUrl');
    var raptorizeImageUrlIndex = raptorizeImageUrlSelect.selectedIndex;
	var raptorizeAudioUrlIndex = raptorizeAudioUrlSelect.selectedIndex;
    var raptorizeImageUrl = raptorizeImageUrlSelect.options[raptorizeImageUrlIndex].value;
	var raptorizeAudioUrl = raptorizeAudioUrlSelect.options[raptorizeAudioUrlIndex].value;

    var useCustomImage = document.getElementById('useCustomImage').checked;
    var imageUrl = document.getElementById('imageUrl').value;
    var useCustomSound = document.getElementById('useCustomSound').checked;
    var soundUrl = document.getElementById('soundUrl').value;
    chrome.storage.sync.set({
        raptorizeImageUrl: raptorizeImageUrl,
		raptorizeAudioUrl: raptorizeAudioUrl,
        useCustomImage: useCustomImage,
        useCustomSound: useCustomSound,
        imageUrl: imageUrl,
        soundUrl: soundUrl
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        //Defaults
        raptorizeImageUrl: '',
		raptorizeAudioUrl: '',
        useCustomImage: false,
        useCustomSound: false,
        imageUrl: '',
        soundUrl: ''
    }, function(items) {
        var raptorImageSelect = document.getElementById('raptorizeImageUrl');
        for (var i = 0; i < raptorImageSelect.length; i++) {
            if (raptorImageSelect.options[i].value === items.raptorizeImageUrl)
                raptorImageSelect.selectedIndex = i;
        }
		var raptorAudioSelect = document.getElementById('raptorizeAudioUrl');
        for (var j = 0; j < raptorAudioSelect.length; j++) {
            if (raptorAudioSelect.options[j].value === items.raptorizeAudioUrl)
                raptorAudioSelect.selectedIndex = j;
        }
        document.getElementById('useCustomImage').checked = items.useCustomImage;
        document.getElementById('imageUrl').value = items.imageUrl;
        document.getElementById('useCustomSound').checked = items.useCustomSound;
        document.getElementById('soundUrl').value = items.soundUrl;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
