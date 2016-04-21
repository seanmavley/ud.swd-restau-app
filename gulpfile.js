var gulp = require('gulp');
    concat = require('gulp-concat');
    uglify = require('gulp-uglify');
    rename = require('gulp-rename');
    nodemon = require('gulp-nodemon'),
    mongodbData = require('gulp-mongodb-data'),
    browser = require('browser-sync').create();

var toBuild = [
    './client/js/init.js',
    './client/js/app.js'
];

gulp.task('initialize', function() {
  gulp.src('./public/import.json')
    .pipe(mongodbData({
      mongoUrl: 'mongodb://localhost/resta',
      collectionName: 'Restaurant',
      dropCollection: true
    }));
});

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

gulp.task('buildScripts', function() {
    gulp.watch(toBuild, ['scripts']);
});

gulp.task('serve', ['buildScripts'], function () {
  nodemon({
    script: 'server.js',
    env: {
      'PORT': 8000
    },
    ext: 'js html',
    watch: ['public']
  })
    .on('restart', function () {
      console.log('restarted!');
    });
});

// crank up the gears!
gulp.task('default', ['serve', 'buildScripts']);
