// Variables
var gulp = require('gulp'),
    { series, parallel } = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    terser = require('gulp-terser'),
    browserSync = require('browser-sync').create()
   
// Compile scss into css
function style() {
    return gulp.src('app/sass/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
}

// Looks for a file called styles.css inside the css directory
// Copies and renames the file to main.min.css
// Minifies the CSS
// Saves the new file inside the css directory
function minifyCSS() {
  return gulp.src('app/css/main.css')
    .pipe(rename('main.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./css'));
}

// Looks for a file called app.js inside the js directory
// Copies and renames the file to script.min.js
// Minifies the JS
// Saves the new file inside the js directory
function minifyJS() {
  return gulp.src('app/js/script.js')
    .pipe(rename('script.min.js'))
    .pipe(terser())
    .pipe(gulp.dest('./js'));
}

// Watch for file changes
function watch() {
    browserSync.init({
        server: {
           baseDir: 'app',
           index: '/index.html'
        }
    });
    gulp.watch('./sass/*.scss', style)
    gulp.watch('./*.html').on('change',browserSync.reload);
    gulp.watch('./js/*.js').on('change', browserSync.reload);
}

// Makes both functions available as a single default task
// The two functions will execute asynchronously - in parallel
// And two next function in series
exports.default = gulp.series(style, parallel(minifyCSS, minifyJS), watch);


