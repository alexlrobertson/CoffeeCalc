var gulp = require("gulp");
var stylus = require("gulp-stylus");
var ts = require("gulp-typescript");

gulp.task("scripts", function () {
  var tsResult = gulp.src("./app.ts")
    .pipe(ts());

  tsResult.js
    .pipe(gulp.dest("./"));
});

gulp.task("styles", function () {
  gulp.src("./stylus/style.styl")
    .pipe(stylus())
    .pipe(gulp.dest("./css/"));
});

gulp.task("watch", function () {
  gulp.watch("./stylus/*.styl", ["styles"]);
  gulp.watch("./app.ts", ["scripts"]);
});

gulp.task("default", ["styles", "scripts", "watch"]);
