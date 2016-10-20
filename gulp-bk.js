/**
 * Created by zhouyongjia on 2016/10/19.
 */
'use strict';

/**
 * Created by shensiming on 2016/5/12.
 *
 */

//var projectName='cashier_app';
// var projectName='merchantApp';
//var projectName = 'coupons_app';
var projectName = 'fanhua_app';

var gulp = require('gulp'),
  uglify = require('gulp-uglify'),                          // 压缩js文件
  minCSS = require("gulp-clean-css"),                       // 压缩css文件
  minImg = require('gulp-imagemin'),                        // 使用gulp-imagemin插件来压缩jpg、png、gif等图片
  gulpCache = require('gulp-cache'),                        // 仅缓存修改的图片
  minHTML = require("gulp-minify-html"),                    // 压缩html文件
  jshint = require("gulp-jshint"),                          // 用来检查js代码的语法错误
  stylish = require('jshint-stylish'),                      // jshint语法错误的输出文本样式
  concat = require("gulp-concat"),                          // 文件合并,减少页面的http请求
  browserSync = require('browser-sync'),                    // web服务器+保存自动刷新
  proxyMiddleware = require('http-proxy-middleware'),       // 配置代理
  zip = require('gulp-zip'),                                // 文件打包
  sass = require('gulp-sass'),                              // 编译sass文件
  less = require('gulp-less'),
  autoprefixer = require('gulp-autoprefixer'),              // 为css语句自动添加各大浏览器的hack标识
  watchPath = require('gulp-watch-path'),                   // 监听发生变化的文件,哪个文件发生修改,编译哪个文件
//gulpCache = require('gulp-cache'),                        // 仅缓存更改的图片
  gutil = require('gulp-util'),                             // 在命令行打印输出有颜色标识的调试信息
  plumber = require('gulp-plumber'),                        // 防止编译出错时gulp进程崩溃,错误修复后gulp可继续运行
  ngAnnotate = require('gulp-ng-annotate'),                 // js压缩会破坏angularJS文件所需的依赖注入,因此需要预处理一下
  es = require('event-stream'),                          // 把多个输出目录聚合在一起
  del = require('del'),                                   // 删除文件夹
  runSequence = require('run-sequence'),                    // 同步运行gulp任务
// filter = require('gulp-filter'),                       // 文件夹过滤
  rev = require('gulp-rev-append'),                       // 给html文件引用的资源打时间戳
  sftp = require('gulp-sftp'),                           // 文件上传
  config = require('./config.json'),                      // 上传配置文件
  notify = require('gulp-notify');                          // 外部报告器

const path = require('path');

var src = {};
src.cssPath = projectName + '/css/';
src.cssFilePath = projectName + '/css/**/*.css';

src.sassPath = projectName + '/css/sass/';
src.sassFilePath = projectName + '/css/sass/**/*.scss';

src.lessPath = projectName + '/css/vendors/sui-less/';
src.lessFilePath = projectName + '/css/vendors/sui-less/*.less';

src.imgFilePath = projectName + '/images/*.{svg,jpg,jpeg,png,gif,ico}';

src.htmlFilePath = projectName + '/views/**/*.html';
src.indexHtmlPath = projectName + '/index.html';

src.jsPath = projectName + '/js/';
src.jsFilePath = projectName + '/js/**/*.js';
src.jsProviderFile = projectName + '/provider/**/*.{js,json}';


var dest = {};
dest.cssPath = projectName + '/css/';
dest.jsPath = projectName + '/js/';


// 检测js文件语法错误
gulp.task('jshint', function () {

  gulp.watch([src.jsFilePath], function (event) {

    var paths = watchPath(event, src.jsPath, dest.jsPath);

    gutil.log(gutil.colors.green(event.type) + ':' + paths.srcPath)

    return gulp.src([paths.srcPath])
               .pipe(jshint('.jshintrc'))
               .pipe(jshint.reporter(stylish, {verbose: true})) // 报告详细的语法错误
               // .pipe(jshint.reporter('default'))            // shint.reporter(stylish)和jshint.reporter()功能是一样的
               .pipe(notify({message: paths.srcPath + '语法检查完毕'}));
  })
})

// 编译less文件
gulp.task('less', function () {
  const DESTDIR = path.join(dest.cssPath, 'vendors');
  gulp.watch([src.lessFilePath], function (event) {

    var paths = watchPath(event, src.lessPath, DESTDIR);

    gutil.log(gutil.colors.green(event.type) + ':' + paths.srcPath)
    gutil.log(gutil.colors.yellow('发布路径') + ':' + paths.distPath);

    gulp.src([paths.srcPath]) //多个文件以数组形式传入
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        .pipe(gulp.dest(DESTDIR))
        .pipe(notify({message: paths.srcPath + '编译完成(less)'}));
    ; //将会在src/css下生成index.css以及detail.css
  })
});

// 编译sass文件
gulp.task('scss', function () {

  gulp.watch([src.sassFilePath], function (event) {

    var paths = watchPath(event, src.sassPath, dest.cssPath);

    gutil.log(gutil.colors.green(event.type) + ':' + paths.srcPath)
    gutil.log(gutil.colors.yellow('发布路径') + ':' + paths.distPath);

    return gulp.src([paths.srcPath])
               .pipe(sass().on('error', sass.logError))
               .pipe(plumber())
               //       .pipe(autoprefixer('last 2 version', 'safari 5', 'opera 12.1', 'ios 6', 'android 4'))
               .pipe(gulp.dest(dest.cssPath))
               .pipe(notify({message: paths.srcPath + '编译完成'}));
  });

});

// 给css新特性添加各个浏览器Hack
gulp.task('css', function () {

  gulp.watch([src.cssFilePath], function (event) {

    var paths = watchPath(event, src.cssPath, dest.cssPath);

    //         gutil.log(gutil.colors.green(event.type)  + ':' + paths.srcPath)
    //         gutil.log(gutil.colors.yellow('发布路径') + ':' + paths.distPath);

    return gulp.src([paths.srcPath])
               //.pipe(autoprefixer('last 2 version', 'safari 5', 'opera 12.1', 'ios 6', 'android 4'))
               .pipe(autoprefixer('last 5 version', 'safari 5', 'opera 12.1', 'ios 6', 'android 4'))
               .pipe(plumber())
               .pipe(gulp.dest(dest.cssPath));
  });
});


// 删除打包文件夹
gulp.task('del', function () {
  return del(['build']);
});


// 压缩js文件
gulp.task('minJS', function () {

  var modules = gulp.src([src.jsFilePath], {base: projectName + '/js'})
                    .pipe(ngAnnotate())
                    .pipe(uglify({outSourceMap: false}))
                    .pipe(gulp.dest('build/' + projectName + '/js'));

  var provider = gulp.src([src.jsProviderFile])
                     .pipe(gulp.dest('build/' + projectName + '/provider'));

  return es.concat(modules, provider);

});

// 压缩css文件
gulp.task('minCSS', function (callback) {

  gulp.src([projectName + '/css/fonts/*.*'])
      .pipe(gulp.dest('build/' + projectName + '/css/fonts'));

  gulp.src([projectName + '/css/font/*.*'])
      .pipe(gulp.dest('build/' + projectName + '/css/font'));

  gulp.src([projectName + '/css/*.css'])
      .pipe(minCSS())
      .pipe(gulp.dest('build/' + projectName + '/css'));

  gulp.src([projectName + '/css/vendors/*.css'])
      .pipe(minCSS())
      .pipe(gulp.dest('build/' + projectName + '/css/vendors'));

  callback();
});

// 压缩svg,jpg,jpeg,png,gif等格式图片
gulp.task('minImg', function () {

  return gulp.src(src.imgFilePath)
             .pipe(gulpCache(minImg({
               optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
               progressive      : true,    //类型：Boolean 默认：false 无损压缩jpg图片
               interlaced       : true,     //类型：Boolean 默认：false 隔行扫描gif进行渲染
               multipass        : false       //类型：Boolean 默认：false 多次优化svg直到完全优化
             })))
             .pipe(gulp.dest('build/' + projectName + '/images'));

});

// 压缩html文件
gulp.task('minHTML', function () {

  var index = gulp.src([src.indexHtmlPath])
                  .pipe(rev())
                  .pipe(minHTML())
                  .pipe(gulp.dest('build/' + projectName));

  var other = gulp.src([src.htmlFilePath])
                  .pipe(minHTML())
                  .pipe(gulp.dest('build/' + projectName + '/views/'));

  return es.concat(index, other);

});


// 把多个css或js文件合并为一个
gulp.task('concatFile', function () {
  return gulp.src([src.jsFilePath])      // 要合并的文件

             .pipe(concat('all.js'))     // 合并匹配到的js文件并命名为 "all.js"
             .pipe(gulp.dest('build/all-in-one'));
});


//文件打包
gulp.task('packFile', function () {
  return gulp.src('build/' + projectName + '/**')
             .pipe(zip(projectName + '.zip'))
             .pipe(gulp.dest('build'))
  /*  .pipe(sftp({
   host: config.sftp.host,
   user: config.sftp.user,
   port: config.sftp.port,
   pass: config.sftp.pass,
   remotePath: config.sftp.remotePath
   }));*/
});

//上传到远程服务器任务
gulp.task('upload', function () {
  gulp.watch([projectName + '/**'], function (event) {

    var paths = watchPath(event, projectName + '/**', config.sftp.remotePath);

    gutil.log(gutil.colors.green(event.type) + ':' + paths.srcPath)
    gutil.log(gutil.colors.yellow('发布路径') + ':' + paths.distPath);

    return gulp.src(paths.srcPath, {base: projectName})
               .pipe(plumber())
               .pipe(sftp({
                 host      : config.sftp.host,
                 user      : config.sftp.user,
                 port      : config.sftp.port,
                 pass      : config.sftp.pass,
                 remotePath: "/alidata1/sites/admin.qiandan.com"
               }))
               .pipe(notify({message: '文件上传已完成'}));
  });
})

gulp.task('server', function () {
  //var proxyAdmin = proxyMiddleware('/manage/', {
  //  target: 'http://10.139.52.133:5080'
  //});
  var proxyAdmin = proxyMiddleware('/coupon', {
    //target: 'http://192.168.201.137:8090'   //本地开发环境
    target: 'http://192.168.200.235:8080'     //联调测试环境
    //target: 'http://10.139.104.198:5080' //测试环境
  });

  //var proxyOther = proxyMiddleware('/coupon/off_shelf_coupon', {
  //  //target: 'http://192.168.201.137:8090'   //本地开发环境
  //  target: 'http://192.168.201.36:1080'     //联调测试环境
  //});

  browserSync.init({
    server    : {
      baseDir: "./" + projectName
    },
    // proxy: "http://admin.qiandan.com",   //后端服务器地址
    // serveStatic: ['./'+projectName],     // 本地文件目录，proxy同server不能同时配置，需改用serveStatic代替
    startPath : "/index.html",
    //browser: ["Google Chrome"],
    port      : 50000,
    middleware: [proxyAdmin]
  });

  gulp.watch([projectName + '/**/*.{html,css,js,jpg,png,gif}']).on('change', browserSync.reload);
});

gulp.task('releaseServer', function () {

  var proxyAdmin = proxyMiddleware('/coupon', {
    //target: 'http://192.168.201.137:8090'   //本地开发环境
    //target: 'http://192.168.200.235:8080'     //联调测试环境
    target: 'http://10.139.104.198:5080' //测试环境
  });

  browserSync.init({
    server    : {
      baseDir: "./build/" + projectName
    },
    // proxy: "http://admin.qiandan.com",   //后端服务器地址
    // serveStatic: ['./'+projectName],     // 本地文件目录，proxy同server不能同时配置，需改用serveStatic代替
    startPath : "/index.html",
    //browser: ["Google Chrome"],
    port      : 50000,
    middleware: [proxyAdmin]
  });

  gulp.watch([projectName + '/**/*.{html,css,js,jpg,png,gif}']).on('change', browserSync.reload);
});


gulp.task('serve', ['jshint', 'scss', 'less', 'css', 'server']);
gulp.task('debug', ['jshint', 'scss', 'css', 'server', 'upload']);
//gulp.task('release', ['minJS', 'minCSS','minImg','minHTML','concatFile','packFile']);

gulp.task('release', function (callback) {
  runSequence('del', ['jshint', 'scss', 'less', 'css'], ['minJS', 'minCSS', 'minImg', 'minHTML'], 'releaseServer', callback);
});


