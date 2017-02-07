const hbs = require('hbs'),
      gulp = require('gulp'),
      //sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      uglify = require('gulp-uglify'),
      size = require('gulp-size'),
      concat = require('gulp-concat');


var customizeBootstrap = require('gulp-customize-bootstrap');
var sass = require('gulp-sass');

gulp.task('compileBootstrap', function() {
   return gulp.src('node_modules/bootstrap/scss/bootstrap.scss')
      .pipe(customizeBootstrap('styles/scss/*.scss'))
      .pipe(sass())
      .pipe(gulp.dest('styles/'));
});
