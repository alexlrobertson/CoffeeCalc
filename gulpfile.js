var gulp = require("gulp");
var stylus = require("gulp-stylus");

gulp.task("style", function () {
  gulp.src("./stylus/style.styl")
    .pipe(stylus())
    .pipe(gulp.dest("./css/"));
});

gulp.task("watch", function () {
  gulp.watch("./stylus/*.styl", ["style"]);
});

gulp.task("default", ["style"]);
