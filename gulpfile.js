'use strict';

// Load plugins

const gulp = require('gulp');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const eslint = require('gulp-eslint');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');


function scss() {
  return gulp
    .src('assets/flake-catalog.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('assets/'))
}

function minify_css() {
  return gulp.src('assets/css/*.css')
    .pipe(cleancss())
    .pipe(rename('main.min.css.liquid'))
    .pipe(gulp.dest('assets'));
}

// Watch files
function watchFiles() {
    gulp.watch('assets/flake-catalog.scss', scss);
}

// define complex tasks
const css = gulp.series(scss);
const build = gulp.series(gulp.parallel(css));
const watch = gulp.series(gulp.parallel(build,watchFiles));

// export tasks
exports.css = css;
exports.min_css = css;
exports.build = build;
exports.watch = watch;
exports.default = build;
