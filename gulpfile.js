const { src, dest, watch, parallel } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();

const serve = () => {
  browserSync.init({
    server: './dist',
    files: ['dist/assets/css/main.css', 'dist/assets/js/main.js']
  });

  watch('src/index.pug', html).on('change', browserSync.reload);
  watch('src/main.scss', css);
};

const html = () =>
  src('src/index.pug')
    .pipe(pug())
    .pipe(dest('dist'));

const css = () =>
  src('src/main.scss')
    .pipe(sass())
    .pipe(postcss([cssnano]))
    .pipe(dest('dist/assets/css'))
    .pipe(browserSync.stream());

exports.build = parallel(html, css);
exports.dev = parallel(exports.build, serve);
