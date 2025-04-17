var syntax         = 'scss', // Syntax: sass or scss;
    gmWatch        = false; // ON/OFF GraphicsMagick watching "img/_src" folder (true/false). Linux install gm: sudo apt update; sudo apt install graphicsmagick

var gulp          = require('gulp'),
    gutil         = require('gulp-util' ),
    sass          = require('gulp-sass')(require('sass')),
    browserSync   = require('browser-sync'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    cleancss      = require('gulp-clean-css'),
    rename        = require('gulp-rename'),
    autoprefixer  = require('gulp-autoprefixer'),
    notify        = require('gulp-notify'),
    del           = require('del');

// Local Server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false,
    })
});

// Sass|Scss Styles
gulp.task('styles', function() {
    return gulp.src(syntax+'/**/*.'+syntax+'')
    .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
    .pipe(rename({ suffix: '.min', prefix : '' }))
    .pipe(autoprefixer(['last 2 versions']))
    .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.stream())
});

// JS
gulp.task('scripts', function() {
    return gulp.src('js/**/*.js')
    .pipe(concat('scripts.min.js'))
    // .pipe(uglify()) // Mifify js (opt.)
    .pipe(gulp.dest('_site/js'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
    gulp.watch(syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
    gulp.watch(['js/**/*.js', '_site/js/common.js'], gulp.parallel('scripts'));
});
gmWatch ? gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'watch')) 
        : gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'watch'));
