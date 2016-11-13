const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
gulp.task('clean', () =>
  del(['dist/**'])
);
gulp.task('copy', () =>
  gulp.src(['static/**'])
    .pipe(gulp.dest('dist/static'))
);
gulp.task('default', ['clean'], () =>
  gulp.src(['**/*.js', '!dist/**', '!node_modules/**', '!gulpfile.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'))
);
