const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const gulpSequence = require('gulp-sequence');
const gulpImg = require('gulp-imagemin')

//Takes the sass style sheet and converts it into a css file in the correct folder.
gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
});

//Watch task
gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',['styles']);
});


//Compresses the JS Files into a folder called MinJS
gulp.task('compress', () =>
   gulp.src('js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('./MinJS/'))
);

//Compresses the CSS Files into a folder called cssnano
gulp.task('cssnano', () =>
    gulp.src('./css/*.css')
  .pipe(cssnano())
  .pipe(gulp.dest('./cssnano/'))
);

//Compress Img Files - ES6 Syntax
gulp.task('gulpImg', () =>
    gulp.src('img/*')
    .pipe(gulpImg())
    .pipe(gulp.dest('./imgmin/'))
);

//Run all of the tasks in order
gulp.task('build', gulpSequence('styles', 'cssnano', 'compress', 'gulpImg'));
