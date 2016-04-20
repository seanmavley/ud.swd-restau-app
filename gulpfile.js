var gulp = require('gulp');
    concat = require('gulp-concat');
    uglify = require('gulp-uglify');
    rename = require('gulp-rename');
    nodemon = require('gulp-nodemon'),
    browser = require('browser-sync').create();

var toBuild = [
    './client/js/init.js',
    './client/js/app.js'
];

var publicDir = 'public/build';

// Concatenate and minify all JS files
gulp.task('scripts', function () {
  return gulp.src(toBuild)
    .pipe(concat('resta.js'))
    .pipe(gulp.dest(publicDir))
    .pipe(rename('resta.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(publicDir));
});

gulp.task('watchScripts', function() {
    gulp.watch(toBuild, ['scripts']);
});

// start server
gulp.task('serve', ['watchScripts'], function () {
  nodemon({
    script: 'server.js',
    env: {
      'PORT': 8000
    }
  })
    .on('restart', function () {
      console.log('restarted!');
    });
});
