// Saves options to chrome.storage.sync.
function save_options() {
  var useCustomImage = document.getElementById('useCustomImage').checked;
  var imageUrl = document.getElementById('imageUrl').value;
  chrome.storage.sync.set({
    useCustomImage: useCustomImage,
    imageUrl: imageUrl
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
    imageUrl: ''
  }, function(items) {
    document.getElementById('useCustomImage').checked = items.useCustomImage;
    document.getElementById('imageUrl').value = items.imageUrl;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
