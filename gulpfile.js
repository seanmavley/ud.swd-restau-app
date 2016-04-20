var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    browser = require('browser-sync'),
    mongodbData = require('gulp-mongodb-data');

// loading fixtures. 50 documents
gulp.task('initialize', function() {
    gulp.src('./import.json')
        .pipe(mongodbData({
            mongoUrl: 'mongodb://localhost/resta',
            collectionName: 'Restaurant',
            dropCollectoin: true
        }))
});

gulp.task('forStatic', function() {
    gulp.watch('*.html').on('change', browser.reload);
});

gulp.task('default', function() {
    nodemon({
        script: 'server.js',
        ext: 'js',
        env: {
            PORT:8000
        },
        ignore: ['./node_modules']
        // tasks: ['forStatic']
    }).
    on('restart', function() {
        console.log('Restarting');
    });
})
