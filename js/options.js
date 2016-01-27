// Saves options to chrome.storage.sync.
function save_options() {
  var useCustomImage = document.getElementById('useCustomImage').checked;
  var imageUrl = document.getElementById('imageUrl').value;
  var useCustomSound = document.getElementById('useCustomSound').checked;
  var soundUrl = document.getElementById('soundUrl').value;
  chrome.storage.sync.set({
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
    useCustomImage: false,
    useCustomSound: false,
    imageUrl: '',
    soundUrl: ''
  }, function(items) {
    document.getElementById('useCustomImage').checked = items.useCustomImage;
    document.getElementById('imageUrl').value = items.imageUrl;
    document.getElementById('useCustomSound').checked = items.useCustomSound;
    document.getElementById('soundUrl').value = items.soundUrl;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
