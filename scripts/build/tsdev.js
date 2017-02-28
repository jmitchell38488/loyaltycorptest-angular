var glob = require('glob');
var spawn = require('child_process').spawn;
var fs = require('fs');

glob('src/app/js/components/**/*.html', [], function(err, files) {
    files.forEach(function(file) {

        var component = file.split('/')[4];

        var ng = spawn('ng-html2js', ['-m', component, file]),
            sed = spawn('sed', ['-e', '1,7d']),
            sedl = spawn('sed', ['-e', 's/^module.run/angular.module(\'' + component + '\').run/g']),
            sedf = spawn('sed', ['-e', 's/.put(\'src\\/app\\/js/.put(\'js/g']),
            //min = spawn('minify', ['--html']),
            write = fs.createWriteStream('build/js/partials.js', {'flags': 'a'});

        ng.stdout.pipe(sed.stdin);
        sed.stdout.pipe(sedl.stdin);
        sedl.stdout.pipe(sedf.stdin);
        sedf.stderr.pipe(process.stderr);
        sedf.stdout.pipe(write);
        //min.stdout.pipe(write);

        write.on('end', function(code) {
            write.close();
        });

    });
});