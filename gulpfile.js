const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const ghPages = require('gulp-gh-pages');

// MINIFY CSS 
gulp.task('minify-css', () => {
        return gulp.src('app/sass/main.scss')
        .pipe(rename('main.min.css'))
        .pipe(cleanCSS({ compatibility: '*' }))
        .pipe(gulp.dest('./css'));
});

// MINIFY JS
gulp.task('uglify-js', () => {
    return gulp.src('app/js/script.js')
        .pipe(rename('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});

// Watch for file changes
gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
gulp.watch('./sass/*.scss', minify - css).on('change', browserSync.reload);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./js/*.js').on('change', browserSync.reload);
})

gulp.task('deploy', () => {
    return gulp.src('./dist/')
        .pipe(ghPages());
});

gulp.task('default', ['minify-css', 'uglify-js', 'browserSync','deploy']);
