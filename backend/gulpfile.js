const gulp = require('gulp');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const env = require('gulp-env');
const del = require('del');

gulp.task('clean', () =>
  del(['dist/**'])
);

gulp.task('copy', () =>
  gulp.src(['static/**'])
    .pipe(gulp.dest('dist/static'))
);

gulp.task('default', ['copy'], () =>
    gulp.src(['**/*.js', '!dist/**', '!node_modules/**', '!gulpfile.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('set-testing-env', () => {
  env({
    vars: {
      NODE_ENV: 'testing'
    }
  });
});

gulp.task('pre-test', function () {
  return gulp.src(['dist/index.js', 'dist/resources/**/*.js'])
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['default', 'set-testing-env', 'pre-test'], function () {
  return  gulp.src(['dist/pu/**/*.test.js'])
    .pipe(mocha({ reporter: 'nyan' }))
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports())
    // Enforce a coverage of at least 90%
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 50 } }));
});