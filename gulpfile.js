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


// less -> css
gulp.task('less', function () {
  return gulp.src('./less/icono.less')
             .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
             //.pipe(plumber())
             .pipe(less())
             .pipe(autoprefixer('last 10 versions', 'ie 10'))
             .pipe(gulp.dest('./build'))
             .pipe(notify({message: 'less编译完成'}));
});


// stylus -> css
gulp.task('stylus', function () {
  return gulp.src('./stylus/icono.styl')
             .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
             //.pipe(plumber())
             .pipe(stylus())
             .pipe(autoprefixer('last 10 versions', 'ie 10'))
             .pipe(gulp.dest('./build'))
             .pipe(notify({message: 'stylus编译完成'}));
});

// 编译sass文件
gulp.task('scss', function () {
  return gulp.src('./sass/iconoo.scss')
             .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
             //.pipe(plumber())
             .pipe(sass())
             //.pipe(sass().on('error', sass.logError))
             .pipe(autoprefixer('last 10 versions', 'ie 10'))
             .pipe(gulp.dest('./build'))
             .pipe(notify({message: 'sass编译完成'}));

});


// .css -> .min.css
gulp.task('cssmin', function () {
  gulp.src('./build/*.css')
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./dist'));
});


// live realod the browser
gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: './',
      index: 'index.html',
      reloadDelay: 2000
    }
  });
});

gulp.task('default', ['browser-sync'], function () {
  gulp.watch(['./less/**/*.less'], ['less', browserSync.reload]);
  gulp.watch(['./stylus/**/*.styl'], ['stylus', browserSync.reload]);
  gulp.watch(['./sass/**/*.scss'], ['scss', browserSync.reload]);
  //gulp.watch(['./build/*.css'], ['cssmin', browserSync.reload]);
});

gulp.task('release', ['cssmin']);