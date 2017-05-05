import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import browserSync from 'browser-sync'
import del from 'del'
import bsconfig from './config' // browserSync Config

const plugins = gulpLoadPlugins(), 
      PATHS = {
        dist: './dist/',
        src: './src'
      }

function gulpClean () {
  return () => {
    return del([PATHS.dist + '**'])
      .then(paths => {
          console.log('deleted files and folders:\n', paths.join('\n'))
      });
  }
}

function gulpSass () {
  return () => {
    const stream = gulp.src([
      PATHS.src + '/scss/*',
      '!' + PATHS.src + '/scss/px2rem.scss'
    ])
      .pipe(plugins.sass({outputStyle: 'compressed'}).on('error', plugins.sass.logError))
      .pipe(gulp.dest(PATHS.src + '/css'))
      
    return stream
  }
}

function gulpCss () {
  return () => {
    return gulp.src(PATHS.src + '/css/*')
      // .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
      .pipe(gulp.dest(PATHS.dist))
      .pipe(plugins.minifyCss())
      .pipe(plugins.rename(path => path.basename += '.min'))
      .pipe(gulp.dest(PATHS.dist));
  }
}

function gulpScripts () {
  return () => {
    gulp.src(PATHS.src + '/js/*')
      // .pipe(plugins.jshint())
      // .pipe(plugins.jshint.reporter('default'))
      .pipe(plugins.concat('all.js'))
      .pipe(gulp.dest(PATHS.dist))
      .pipe(plugins.uglify())
      .pipe(plugins.rename(path => path.basename += '.min'))
      .pipe(gulp.dest(PATHS.dist));
  }
}

function gulpImages () {
  return () => {
    gulp.src(PATHS.src + 'images/**/*')
      .pipe(plugins.cache(plugins.imagemin({ 
          optimizationLevel: 5,   //类型：Number  默认：3  取值范围：0-7（优化等级）
          progressive: false, //类型：Boolean 默认：false 无损压缩jpg图片
          interlaced: true,   //类型：Boolean 默认：false 隔行扫描gif进行渲染
          multipass: true     //类型：Boolean 默认：false 多次优化svg直到完全优化
        })))
      .pipe(gulp.dest(PATHS.dist + 'images'));
  }
}

function gulpHtml () {
  return () => {
    gulp.src(PATHS.src + '/index.html')
      .pipe(plugins.htmlReplace({
        'css': './dist/index.min.css',
        'js': './dist/all.min.js'
      }))
      .pipe(gulp.dest(PATHS.dist))
  }
}

function size () {
  return () => {
    gulp.src(PATHS.dist + '**')
      .pipe(plugins.size({
        title: 'build', //标题 
        gzip: true,  //显示gzip压缩大小
        pretty: true, //美化格式 1337 B → 1.34 kB
        showFiles: true //显示所有文件
      }));
  }
}

//css、scripts、images、clean 需异步执行（使用一个 callback，或者返回一个 promise 或 stream）
gulp.task('clean', gulpClean()); // 清理
gulp.task('html', gulpHtml()); // HTML
gulp.task('sass', gulpSass()); // sass 
gulp.task('css', ['sass'], gulpCss()); // css
gulp.task('scripts', gulpScripts()); // js
gulp.task('images', gulpImages()); // 图片
gulp.task('build', ['html', 'css', 'scripts', 'images'], size());

// 主要命令
gulp.task('default', ['clean'], () => gulp.start('build'));

// dev & reload 仅监听文件更改刷新页面
gulp.task('dev', () => {
  browserSync.init(bsconfig);

  gulp.watch(PATHS.src + '/scss/**', () => {
    gulp.run('sass');
  }).on('change', browserSync.reload)

  gulp.watch([
    PATHS.src + '/**',
    '!' + PATHS.src + '/scss/**'
  ]).on('change', browserSync.reload)
}); 

// 测试
gulp.task('test', () => {
  // code here ...
})