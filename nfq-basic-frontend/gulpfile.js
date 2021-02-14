var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('connect', function() {
    connect.server({
        root: 'web'
    });
});

gulp.task('html', function() {
    gulp.src('./web/*.html')
});

gulp.task('sass', function() {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./web/assets'));
});

gulp.task('js', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./web/assets'));
});

gulp.task('watch', function() {
    gulp.watch(['./web/*.html'], ['html']);
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/js/**/*.js', ['js']);
});

gulp.task('default', ['connect', 'sass', 'js', 'watch']);
