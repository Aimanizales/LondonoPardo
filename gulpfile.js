'use strict';

var PATHS = require('./utils/config').paths,
  concat = require('gulp-concat'),
  del = require('del'),
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  connect = require('gulp-connect');

gulp.task('clean', function () {
  return del(['public']);
});

gulp.task('assets', function () {
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest('./public/assets'))
});

gulp.task('styles:sass', function () {
  return gulp.src(PATHS.css.app)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(connect.reload());
});

gulp.task('styles:vendor', function () {
  gulp.src(PATHS.css.vendor)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('html', function () {
  return gulp.src(PATHS.html.app)
    .pipe(gulp.dest('./public/'))
    .pipe(connect.reload());
});

gulp.task('data', function () {
  return gulp.src(PATHS.data.app)
    .pipe(gulp.dest('./public/data'))
    .pipe(connect.reload());
});

gulp.task('scripts:js', function () {
  gulp.src(PATHS.js.app)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('scripts:vendor', function () {
  gulp.src(PATHS.js.vendor)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('server:connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch(['./app/templates/**/*.html'], ['html']);
  gulp.watch(['./app/styles/**/*.scss'], ['styles:sass']);
  gulp.watch(['./app/scripts/**/*.js'], ['scripts:js']);
  gulp.watch(['./data/**/*.json'], ['data']);
});

gulp.task('default', [
  'styles:vendor', 
  'styles:sass', 
  'scripts:vendor',
  'scripts:js',
  'html',
  'assets',
  'data',
  'server:connect', 
  'watch'
]);