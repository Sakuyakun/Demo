`use strict`

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';

const $ = gulpLoadPlugins(),
      PATHS = {
          dist : './dist/',
          src : './src/'
      };

//scss处理
function gulpStyles(){
    return () => {
        gulp.src(PATHS.src + 'css/**/*.css')
            //.pipe($.sass().on('error', sass.logError))
            .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
            .pipe(gulp.dest(PATHS.dist + 'css'))
            .pipe($.minifyCss())
            .pipe($.rename(path => path.basename+='.min'))
            .pipe(gulp.dest(PATHS.dist + 'css'));
    };
}

//js处理
function gulpScripts(){
    return () => {
        gulp.src(PATHS.src + 'js/**/*.js')
            .pipe($.jshint())
            .pipe($.jshint.reporter('default'))
            .pipe($.concat('all.js'))
            .pipe(gulp.dest(PATHS.dist + 'js'))
            .pipe($.uglify())
            .pipe($.rename(path => path.basename+='.min'))
            .pipe(gulp.dest(PATHS.dist + 'js'));
    };
}

//图片处理
function gulpImg(){
    return () => {
        gulp.src(PATHS.src + 'images/**/*')
            .pipe($.cache($.imagemin({ 
                optimizationLevel: 5,   //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: false, //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true,   //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true     //类型：Boolean 默认：false 多次优化svg直到完全优化
             })))
            .pipe(gulp.dest(PATHS.dist + 'images'));
    };
}

//监视
function gulpWatch(){
    return () => {
        gulp.watch(PATHS.src + 'scss/**/*.scss', ['styles']);
        gulp.watch(PATHS.src + 'js/**/*.js', ['scripts']);
        gulp.watch(PATHS.src + 'imges/**/*', ['images']);
    };
}

//清理目录
function gulpClean(){
    return (cb) => {
        return del([PATHS.dist + 'js', PATHS.dist + 'scss', PATHS.dist + 'css', PATHS.dist + 'images'], cb)
    }
}

function gulpDefault(){
    return () => {
        gulp.start('styles','scripts','images')
    }
}

gulp.task('styles', gulpStyles());
gulp.task('scripts', gulpScripts());
gulp.task('images', gulpImg());
gulp.task('watching', gulpWatch());
gulp.task('clean', gulpClean());
gulp.task('default', ['clean'], gulpDefault());