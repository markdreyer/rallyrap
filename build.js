var fs = require('fs');
var archiver = require('archiver');

var checkDir = fs.existsSync('build') || fs.mkdirSync('build');

var output = fs.createWriteStream('build/rallyrap.zip');
var archive = archiver('zip');
output.on('close', function() {
  console.log('ZIP Created - build/rallyrap.zip');
  console.log('Wrote ' + archive.pointer() + 'bytes');
});
archive.on('error', function(err) {
  throw err;
});
archive.pipe(output);
archive.glob('**/*');
archive.finalize();
