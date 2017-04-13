var gulp = require('gulp');
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var gulpDocumentation = require('gulp-documentation');

gulp.task('default', function() {
    gulp.src([
        'src/components/**/*.js',
        'src/core/**/*.js',
        'src/api/**/*.js',
        'src/tests/**/*.js'
    ])
    .pipe(
        plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        })
    )
    .pipe(concat('enext-wishlist.js'))
    .pipe(notify({
        title: "JS READY",
        message: "Generate file: <%= file.relative %>!"
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('build', function() {
    gulp.src(['src/core/**/*.js', 'src/components/**/*.js'])
        .pipe(
            plumber({
                errorHandler: notify.onError("Error: <%= error.message %>")
            })
        )
        .pipe(uglify())
        .pipe(concat('enext-wishlist.js'))
        .pipe(notify({
            title: "JS READY",
            message: "Generate file: <%= file.relative %>!"
        }))
        .pipe(gulp.dest('build/'));
});

// Generating a pretty HTML documentation site
gulp.task('doc', function () {
  return gulp.src('./src/**/*.js')
    .pipe(gulpDocumentation('html'))
    .pipe(gulp.dest('html-documentation'));
});

gulp.task('watch', function(){
    gulp.watch('src/**/*.js', ['default', 'doc'])
        .on('change', function(event){
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});