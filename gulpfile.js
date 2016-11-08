var gulp = require('gulp');
    concat = require('gulp-concat');
    uglify = require('gulp-uglify');
    rename = require('gulp-rename');
    nodemon = require('gulp-nodemon'),
    mongodbData = require('gulp-mongodb-data'),
    browser = require('browser-sync').create();

// build these files
var toBuild = [
    './client/js/init.js',
    './client/js/app.js'
];

// load fixtures
gulp.task('initialize', function() {
  gulp.src('./public/data/import.json')
    .pipe(mongodbData({
      mongoUrl: 'mongodb://localhost/resta',
      collectionName: 'Restaurant',
      dropCollection: true
    }));
});

// build to
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

// watch and repeat if changes to files
gulp.task('buildScripts', function() {
    gulp.watch(toBuild, ['scripts']);
});

// run server
gulp.task('serve', ['buildScripts'], function () {
  nodemon({
    script: 'server.js',
    env: {
      'PORT': 8005
    },
    ext: 'js html',
    watch: ['public']
  })
    .on('restart', function () {
      console.log('restarted!');
    });
});

// combine all
gulp.task('default', ['serve', 'buildScripts']);
