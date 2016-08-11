var gulp = require('gulp');
// 这个插件用来管理所有在package.json里面的gulp插件！用再辛苦一个一个加载了
// 连接符将自动转化成驼峰
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
// 浏览器自动刷新插件，因为不是gulp模块所以需要单独声明
var browserSync = require('browser-sync');

var base = './DataStructuresandAlgorithms/list/';
var urlConfig = 'main.js';

// gulp.src,可以模糊匹配
/**
 * 使用eslint进行语法检测
 */
gulp.task('lint', function() {
    return gulp.src(base + urlConfig)
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format())
        .pipe(plugins.eslint.failAfterError());
});

/**
 * 文件压缩
 */
gulp.task('minify', function() {
    gulp.src(base + urlConfig)
        .pipe(plugins.uglify())
        .pipe(gulp.dest(base + 'build'));
});

var browser = './DataStructuresandAlgorithms/';

/**
 * 浏览器自刷新
 */
gulp.task('browser-sync', function() {
    var files = [
        browser + '**/*.html',
        browser + '**/*.css',
        browser + '**/*.js',
    ];

    browserSync.init(files, {
        server: {
            baseDir: browser + 'Strack/',
        },
    });
});
gulp.task('default', ['browser-sync'], function() {
    // content
    console.info('－－－－－－');
    console.info('执行浏览器同步刷新');
});