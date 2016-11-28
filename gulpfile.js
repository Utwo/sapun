// Get modules
var gulp = require('gulp');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var minifyHTML = require('gulp-minify-html');
var critical = require('critical');

var base_path = 'assets/';
var build_path = 'public/';

//error log function:
function errorLog(error) {
    console.error(error.message);
}

// browser-sync task for starting the server.
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./public"
        },
        files: "public/",
        ghostMode: {
            clicks: true,
            location: true,
            forms: true,
            scroll: true
        },
        notify: true,
        logFileChanges: false,
        open: false
    });
});

//Task html
gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(minifyHTML({empty: true}))
        .pipe(gulp.dest(build_path));
});

// Task css
gulp.task('css', function () {
    var mainCss = gulp.src(base_path + 'css/style.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .on('error', errorLog)
        .pipe(concat('style.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(build_path + 'css/'))
        .pipe(browserSync.stream());
});

// Task js app
gulp.task('js', function () {
    return gulp.src([base_path + 'js/plugins/*.js', base_path + 'js/*.js'])
        .pipe(concat('main.min.js'))
        .on('error', errorLog)
        .pipe(uglify())
        .pipe(gulp.dest(build_path + 'js/'))
        .pipe(browserSync.stream());
});

//Task images
gulp.task('images', function () {
    return gulp.src(base_path + 'img/**')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(build_path + 'img/'))
});

// Generate & Inline Critical-path CSS
/*gulp.task('critical', function () {
    critical.generate({
        base: build_path,
        src: 'index.html',
        css: build_path + 'css/style.min.css',
        dest: 'index.html',
        inline: true,
        minify: true,
        ignore: ['font-face'],
        width: 1300,
        height: 900
    })
});*/

gulp.task('watch', function () {
    gulp.watch(base_path + 'css/**', ['css']);
    gulp.watch(base_path + 'js/**', ['js']);
    gulp.watch(base_path + 'img/**', ['images']).on('change', browserSync.reload);
    gulp.watch('*.html', ['html']).on('change', browserSync.reload);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['browser-sync', 'css', 'js', 'html', 'watch']);

// Task when ready for production
gulp.task('production', ['css', 'js', 'html',, 'images']);