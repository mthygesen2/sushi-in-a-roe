'use strict';

// Require our dependencies
var gulp = require('gulp');
var babel = require('gulp-babel');
var stylus = require('gulp-stylus');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');
var nib = require('nib');
var jeet = require('jeet');
var jade = require('gulp-jade');

// Confingure our directories
var paths = {
  stylus: 'src/stylus',
  js: 'src/js',
  templates: 'src/templates',
  buildHtml: './',
  buildJs: './js',
  buildCss: './css',
  sourceMaps: 'source-maps/'
};

// Stylus Tasks
gulp.task('build-css', function() {
  gulp.src([paths.stylus + '/*.styl', '!' + paths.stylus + '/*.import.styl'])
    .pipe(sourcemaps.init())
    .pipe(stylus({
      paths: ['node_modules', 'styles/globals'],
      import: ['jeet/stylus/jeet', 'nib', 'rupture/rupture'],
      use: [nib(), jeet()],
      'include css': true,
      compress: true
    }))
    .on('error', swallowError)
    .pipe(sourcemaps.write(paths.sourceMaps))
    .pipe(gulp.dest(paths.buildCss))
    .pipe(livereload())
});

// Javascript Tasks
gulp.task('build-js', function() {
  return gulp.src([paths.js + '/**/*.js', '!' + paths.js +
      '/game/node_modules/**'
    ])
    .pipe(babel())
    .pipe(sourcemaps.init())
    //  .pipe(uglify())
    .pipe(sourcemaps.write(paths.sourceMaps))
    .pipe(gulp.dest(paths.buildJs))
    .pipe(livereload());
});

// Jade Tasks
gulp.task('build-html', function() {
  gulp.src(paths.templates + '/**/*.html.jade')
    .pipe(sourcemaps.init())
    .pipe(jade())
    .pipe(rename(function(opt) {
      opt.basename = opt.basename.replace('.html', '');
      return opt;
    }))
    .pipe(sourcemaps.write(paths.sourceMaps))
    .pipe(gulp.dest(paths.buildHtml))
    .pipe(livereload())
});

// Watch
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(paths.stylus + '/**/*', ['build-css']);
  gulp.watch(paths.js + '/**/*', ['build-js']);
  gulp.watch(paths.templates + '/**/*', ['build-html']);
});

// Swallow errors so we don't halt watch
function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}
