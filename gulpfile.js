var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    connect = require('gulp-connect'),
    del = require('del'),
    bower = require('gulp-bower'),
    inject = require('gulp-inject'),
    mainBowerFiles = require('main-bower-files'),
    angularFilesort = require('gulp-angular-filesort'),
    proxyMiddleware = require('http-proxy-middleware'),
    open = require('gulp-open');

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('dist/bower_components'))
});

gulp.task('html', function () {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist/assets/html'))
    .pipe(connect.reload());
});

gulp.task('styles', function() {
  return sass('app/styles/main.scss', {
      loadPath: [
          'library',
          './bower_components'
      ],
      style: 'expanded'
  })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('app/styles/css'))
    .pipe(connect.reload())
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('app/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(connect.reload())
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(connect.reload())
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('index', function () {
  var target = gulp.src('app/index.html');
  var jsSource = gulp.src(['./app/**/*.js']);
  var cssSource = gulp.src(['./app/styles/css/*.css']);

  return target
    .pipe(inject(
      gulp.src(mainBowerFiles(), {read: false}),
                    {ignorePath: 'app', addRootSlash: false, name: 'bower'}))
    .pipe(inject(jsSource.pipe(angularFilesort()), {ignorePath: 'app', addRootSlash: false }))
    .pipe(inject(cssSource, {read: false, ignorePath: 'app', addRootSlash: false }))
    .pipe(gulp.dest('app'));
});

gulp.task('clean', function() {
    return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'html', 'bower');
});

gulp.task('serve', function() {
  var proxy = proxyMiddleware('/api', {target: 'http://localhost:3000'});

  connect.server({
        root: './app',
        port: 9000,
        livereload: true,
        middleware: function(connect, opt) {
          var middlewares = [
            proxy,
            connect().use('/bower_components', connect.static('bower_components'))
          ]
          return middlewares;
        }
    });

  //open app in browser after server starts
  gulp.src('./index.html')
    .pipe(open({uri: 'http://localhost:9000'}));

  // Watch any files in dist/, reload on change
  gulp.watch(['app/**/*.html'], ['html']);

  // Watch .scss files
  gulp.watch('app/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('app/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('app/images/**/*', ['images']);

});
