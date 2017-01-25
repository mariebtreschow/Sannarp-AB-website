const hbs = require('hbs'),
      gulp = require('gulp'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      uglify = require('gulp-uglify'),
      size = require('gulp-size'),
      concat = require('gulp-concat');

gulp.task('scss', () => {
   gulp.src('frontend/scss/application.scss')
   .pipe(sourcemaps.init())
   .pipe(sass({ outputStyle: 'compressed'}))
   .pipe(concat('application.scss'))
   .pipe(size())
   .pipe(sourcemaps.write())
   .pipe(gulp.dest('public/css'));
});

gulp.task('default', [ 'scss', 'js' ], () => {
   gulp.watch('frontend/scss/**/*.scss', ['scss']);
   gulp.watch('frontend/js/**/*.js', ['js']);
});
