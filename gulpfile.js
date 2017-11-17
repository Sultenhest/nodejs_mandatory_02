const gulp = require('gulp'),

      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      cssnano = require('gulp-cssnano'),
      rename = require('gulp-rename'),
      sourcemaps = require('gulp-sourcemaps'),

      concat = require('gulp-concat'),
      uglify = require('gulp-uglify');

// Autocompile sass
gulp.task('css', function() {
    return gulp.src('sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
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
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/js'));
});

// Watch tasks (css & js) for changes
gulp.task('watch', function() {
    gulp.watch('sass/**/*.scss', ['css']);
    gulp.watch('javascript/**/*.js', ['js']);
});

// Run 'gulp' in terminal to init watch task
gulp.task('default', ['watch']);