var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    browser = require('browser-sync');

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
