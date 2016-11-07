const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
gulp.task('clean', () =>
  del(['dist/**'])
);
gulp.task('copy', () =>
  gulp.src(['chat.html'])
    .pipe(gulp.dest('dist'))
);
gulp.task('default', ['clean', 'copy'], () =>
  gulp.src(['**/*.js', '!dist/**', '!node_modules/**', '!gulpfile.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'))
);
