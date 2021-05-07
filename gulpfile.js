const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const ghPages = require('gulp-gh-pages');

// MINIFY CSS TASK USING `cleanCSS`
gulp.task('minify-css', () => {
    //  provide path to CSS files
    return gulp.src('app/sass/main.scss')
        //  use cleanCSS plugin on `gulp.src` and
        //  set compatibility for IE 
        .pipe(rename('main.min.css'))
        .pipe(cleanCSS({ compatibility: '*' }))
        //  save result to destination path
        .pipe(gulp.dest('./css'));
});

// MINIFY JS TASK USING `uglify`
gulp.task('uglify-js', () => {
    // provide path to Js files
    return gulp.src('app/js/script.js')
        //  use uglify plugin on `gulp.src`
        .pipe(rename('script.min.js'))
        .pipe(uglify())
        //  save result to destination path
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