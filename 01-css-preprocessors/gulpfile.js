const { src, dest, series, watch, parallel } = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const minifyCSS = require("gulp-csso");
const browserSync = require("browser-sync").create();
const del = require("del");

function css() {
  return src("./src/assets/stylesheets/**/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(dest("./dist/assets/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
}

function watchFiles() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  watch("./src/assets/stylesheets/**/*.scss", css);
  watch("./*.html").on("change", browserSync.reload);
}

function clean() {
  return del(["./dist"]);
}

exports.build = series(clean, css);
exports.default = series(clean, css, watchFiles);
