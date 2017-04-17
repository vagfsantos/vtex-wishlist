var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var gulpDocumentation = require('gulp-documentation');

// DEFAULT TASK
// use it in develoment
gulp.task('default', function() {
    return gulp.src([
        'src/components/**/*.js',
        'src/core/**/*.js',
        'src/api/**/*.js',
        'src/tests/**/*.js'
    ])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat('vtex-custom-wishlist.js'))
    .pipe(notify({
        title: "JS READY",
        message: "Generate file: <%= file.relative %>!"
    }))
    .pipe(gulp.dest('build/'));
});

// DIST TASK
// use to make your deploy
gulp.task('dist', ['doc', 'cleanDist'], function() {
    return gulp.src([
        'src/components/**/*.js',
        'src/core/**/*.js',
        'src/api/**/*.js'
    ])
    .pipe(plumber(function(error){
        notify({
            title: "JS ERROR",
            message: error.toString()
        })
    }))
    .pipe(concat('vtex-custom-wishlist.min.js'))
    .pipe(notify({
        title: "JS READY",
        message: "Generate file: <%= file.relative %>!"
    }))
    .pipe(gulp.dest('dist/'));
});

// DOC TASK
// use to generate the documentation
gulp.task('doc', function () {
    return gulp.src('./src/**/*.js')
        .pipe(plumber())
        .pipe(gulpDocumentation('md'))
        .pipe(gulp.dest('./'));
});

// CLEAN TASK
// use clean the dist before generate it again
gulp.task('cleanDist', function(){
    return gulp.src('./dist')
            .pipe(clean());
});

// WATCH TASK
// use to keep yourself developing
gulp.task('watch', function(){
    return gulp.watch('src/**/*.js', ['default'])
        .on('change', function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});