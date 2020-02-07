const { src, dest, series, watch } = require("gulp");
const sass = require("gulp-sass");
const minifyCSS = require("gulp-csso");

function css() {
  return src("./src/assets/sass/**/*.scss")
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(dest("./dist/assets/css"));
}

module.exports = {
  default: series(css, function() {
    watch("./src/assets/sass/**/*.scss", css);
  })
};
