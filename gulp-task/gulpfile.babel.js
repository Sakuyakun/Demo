`use strict`

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';

const $ = gulpLoadPlugins(),
      reload = browserSync.reload,
      PATHS = {
          dist : './dist/',
          src : './src/'
      };

//CSS文件处理
function gulpStyles(){
    return () => {
        return gulp.src(PATHS.src + 'css/**/*.css')
                //.pipe($.sass().on('error', sass.logError))
                .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
                .pipe(gulp.dest(PATHS.dist + 'css'))
                .pipe($.minifyCss())
                .pipe($.rename(path => path.basename+='.min'))
                .pipe(gulp.dest(PATHS.dist + 'css'));
    };
}

//JavaScript文件处理
function gulpScripts(){
    return () => {
        return gulp.src(PATHS.src + 'js/**/*.js')
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
        return gulp.src(PATHS.src + 'images/**/*')
                .pipe($.cache($.imagemin({ 
                    optimizationLevel: 5,   //类型：Number  默认：3  取值范围：0-7（优化等级）
                    progressive: false, //类型：Boolean 默认：false 无损压缩jpg图片
                    interlaced: true,   //类型：Boolean 默认：false 隔行扫描gif进行渲染
                    multipass: true     //类型：Boolean 默认：false 多次优化svg直到完全优化
                 })))
                .pipe(gulp.dest(PATHS.dist + 'images'));
    };
}

//监视文件变动
function gulpWatch(){
    return () => {
        gulp.watch(PATHS.src + 'scss/**/*.scss', ['styles']);
        gulp.watch(PATHS.src + 'js/**/*.js', ['scripts']);
        gulp.watch(PATHS.src + 'imges/**/*', ['images']);
    };
}

//清理目录并输出提示信息
function gulpClean(){
    return () => {
        return del([PATHS.dist + 'js', PATHS.dist + 'scss', PATHS.dist + 'css', PATHS.dist + 'images'])
                .then(paths => {
                    console.log('deleted files and folders:\n', paths.join('\n'))
                });
    }
}

//构建 执行任务并显示处理后的文件大小
function size(){
    return () => {
        gulp.src(PATHS.dist + '**/*')
            .pipe($.size({ 
                title: 'build', //标题 
                gzip: true,  //显示gzip压缩大小
                pretty: true, //美化格式 1337 B → 1.34 kB
                showFiles: true //显示所有文件
            }));
    }
}

//定义任务
//styles、scripts、images、clean 需异步执行（使用一个 callback，或者返回一个 promise 或 stream）
gulp.task('styles', gulpStyles());
gulp.task('scripts', gulpScripts());
gulp.task('images', gulpImg());
gulp.task('watching', gulpWatch());
gulp.task('clean', gulpClean());
gulp.task('build', ['styles', 'scripts', 'images'], size());

//default 清除输出目录下文件并build重新处理生成文件
gulp.task('default', ['clean'], () => gulp.start('build')); 

//监视任务
gulp.task('serve', ['styles', 'scripts', 'images'], gulpServe())
function gulpServe(){
    return () => {
        browserSync({
            port:8080,
            server:{
                baseDir: ['./']
            }
        });

        gulp.watch([
            PATHS.src + 'scss/**/*.scss',
            PATHS.src + 'js/**/*.js',
            PATHS.src + 'imges/**/*'
        ]).on('change',reload);

        gulp.watch(PATHS.src + 'scss/**/*.scss', ['styles']);
        gulp.watch(PATHS.src + 'js/**/*.js', ['scripts']);
        gulp.watch(PATHS.src + 'imges/**/*', ['images']);
    }
}