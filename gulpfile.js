const gulp = require('gulp'),
      rename = require('gulp-rename'),
      sourcemaps = require('gulp-sourcemaps'),

      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      cssnano = require('gulp-cssnano'),

      concat = require('gulp-concat'),
      uglify = require('gulp-uglify');

// Autocompile sass
gulp.task('sass', function() {
    return gulp.src('sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('./public/css'))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'));
});

//Autocompile js
gulp.task('js', function() {
    return gulp.src('javascript/**/*.js')
        .pipe(concat('javascript.js')) 
        .pipe(sourcemaps.init())
        .pipe(gulp.dest('./public/js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/js'));
});

// Watch tasks (css & js) for changes
gulp.task('watch', function() {
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('javascript/**/*.js', ['js']);
});

// Run 'gulp' in terminal to init watch task
gulp.task('default', ['watch', 'sass', 'js']);