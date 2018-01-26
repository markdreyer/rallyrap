// Saves options to chrome.storage.sync.
function save_options() {
    var raptorizeImageUrlSelect = document.getElementById('raptorizeImageUrl');
    var raptorizeAudioUrlSelect = document.getElementById('raptorizeAudioUrl');
    var raptorizeImageUrlIndex = raptorizeImageUrlSelect.selectedIndex;
    var raptorizeAudioUrlIndex = raptorizeAudioUrlSelect.selectedIndex;
    var customHooksFile = document.getElementById('customHooksFile').value;

    if (customHooksFile) {
        try {
            JSON.parse(customHooksFile);
        } catch (err) {
            var status = document.getElementById('status');
            status.innerHTML = 'Do you even JSON, bra? I need valid JSON for custom hooks.';
            status.style.color = 'red';
            return false;
        }
    }

    chrome.storage.sync.set({
        raptorizeImageUrl: raptorizeImageUrlSelect.options[raptorizeImageUrlIndex].value,
        raptorizeAudioUrl: raptorizeAudioUrlSelect.options[raptorizeAudioUrlIndex].value,
        useCustomImage: document.getElementById('useCustomImage').checked,
        useCustomSound: document.getElementById('useCustomSound').checked,
        useAgeAccentuator: document.getElementById('useAgeAccentuator').checked,
        ageBreakPoints: document.getElementById('ageBreakPoints').value,
        imageUrl: document.getElementById('imageUrl').value,
        soundUrl: document.getElementById('soundUrl').value,
        customHooksFile: customHooksFile
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.innerHTML = 'Options saved.';
        status.style.color = 'green';
        setTimeout(function() {
            status.style.color = 'white';
        }, 1000);
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
        soundUrl: '',
        customHooksFile: '',
        useAgeAccentuator: false,
        ageBreakPoints: "5,10,15,20"
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
        document.getElementById('customHooksFile').value = items.customHooksFile;
        document.getElementById('useAgeAccentuator').checked = items.useAgeAccentuator;
        document.getElementById('ageBreakPoints').value = items.ageBreakPoints;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
