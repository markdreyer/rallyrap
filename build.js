var fs = require('fs');

console.log('PR was:' + process.env.TRAVIS_PULL_REQUEST);
console.log('Branch was:' + process.env.TRAVIS_BRANCH);

if (process.env.TRAVIS_BRANCH === 'master' && process.env.TRAVIS_PULL_REQUEST === 'false') {
    console.log('****Publishing Extension****');
    bump();
    createZip();
} else {
    console.log('****SKIP Publish****');
}

function bump() {
     if (process.argv[2]) {
        var manifestPath = './manifest.json';
        var manifest = require(manifestPath);
        var version = manifest.version.split('.');

        manifest.version = version[0] + '.' + version[1] + '.' + process.argv[2];
        console.log('Bumping version to ' + manifest.version);
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 4));
     }
}

function createZip() {
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
    archive.glob('!(build|node_modules)*');
    archive.glob('!(build|node_modules)/**/*');
    archive.finalize();
}
