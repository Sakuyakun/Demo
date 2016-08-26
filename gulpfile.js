var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'), //sass的编译
    concat = require('gulp-concat'), //合并js文件
    uglify = require('gulp-uglify'), //压缩js文件
    rename = require('gulp-rename'), //重命名
    autoprefixer = require('gulp-autoprefixer'), //添加css属性前缀
    minifycss = require('gulp-minify-css'), //压缩css文件
    jshint = require('gulp-jshint'), //js语法检测
    imagemin = require('gulp-imagemin'), //图片压缩
    notify = require('gulp-notify'), //处理报错信息
    cache = require('gulp-cache'), //图片压缩缓存 当图片没有进行修改时不会被再次压缩
    livereload = require('browser-sync'), //解放F5
    del = require('del');  //删除文件

gulp.task('lint',function(){
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
})

gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', function(){
    gulp.run('lint', 'sass', 'scripts');
    gulp.watch('./js/*.js', function(){
        gulp.run('lint', 'sass', 'scripts');
    });
});

gulp.task('exampleTask',function(){
    gulp.src('./js/*.js')
        .pipe(jshint('.jshintrc'))      //附加对象
        .pipe(jshint.reporter('default')) //输出报错提示 可自定义 默认default
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(notify({ message: 'example task complete!' }));
});
