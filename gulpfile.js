var gulp = require("gulp");
var stylus = require("gulp-stylus");
var ts = require("gulp-typescript");

gulp.task("scripts", function () {
  var tsResult = gulp.src("./app.ts")
    .pipe(ts());

  tsResult.js
    .pipe(gulp.dest("./"));
});

gulp.task("style", function () {
  gulp.src("./stylus/style.styl")
    .pipe(stylus())
    .pipe(gulp.dest("./css/"));
});

gulp.task("watch", function () {
  gulp.watch("./stylus/*.styl", ["style"]);
});

gulp.task("default", ["style"]);
