var gulp = require('gulp'),
    less = require('gulp-less'),
    sass = require('gulp-sass'),
    stylus = require('gulp-stylus'),
    watch = require('gulp-watch'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer');

// 编译sass文件
gulp.task('scss', function () {
    return gulp.src('./sass/iconoo.scss')
               .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
               .pipe(sass())
               .pipe(autoprefixer('last 10 versions', 'ie 10'))
               .pipe(gulp.dest('./build'))
               .pipe(notify({message: 'sass编译完成'}));
});

// .css -> .min.css
gulp.task('cssmin', function () {
    gulp.src('./build/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist'))
        .pipe(notify({message: 'css压缩完成'}));
});

// live realod the browser
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir    : './',
            index      : 'index.html',
            reloadDelay: 2000
        },
        port  : 8090,
    });
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch(['./sass/**/*.scss'], ['scss', browserSync.reload]);
});

gulp.task('release', ['cssmin']);