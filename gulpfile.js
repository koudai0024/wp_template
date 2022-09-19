const gulp = require("gulp");
const sass = require("gulp-dart-sass");
const sassVariables = require('gulp-sass-variables');
const argv = require('yargs').argv;
const env = argv.production ? 'production' : 'development';
const sassGlob = require("gulp-sass-glob-use-forward");
const autoprefixer = require("gulp-autoprefixer");
const purgecss = require("gulp-purgecss");
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const changed = require("gulp-changed");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");
const OUTDIR = "./wp/wp-content/themes/theme1"; //コンパイル後のファイルを出力するフォルダ

const sftp = require('gulp-sftp-up4');
const fs = require('fs');

const ftpOptionload_json = JSON.parse(fs.readFileSync('ftp.json', 'utf8'));

const uploadSftp = () => {
  return gulp.src([`${OUTDIR}/**/*`]).pipe(sftp(ftpOptionload_json));
}

const compileSass = () => {
  return gulp
    .src("./src/assets/scss/style.scss")
    .pipe(sassVariables({ $env: env }))
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(autoprefixer())
    // .pipe(
    //   purgecss({
    //     content: ["./src/**/*.php"],
    //   })
    // )
    .pipe(gulp.dest(`${OUTDIR}`));
};

const compileJs = () => {
  return webpackStream(webpackConfig, webpack).pipe(
    gulp.dest(`${OUTDIR}/assets/js`)
  );
};

const copyImage = () => {
  return gulp
    .src("./src/assets/img/**/*.{png,jpg,jpeg,svg,ico}")
    .pipe(changed(`${OUTDIR}/assets/img`))
    .pipe(
      imagemin([
        pngquant({
          quality: [1, 1],
          // quality: [0.6, 0.7],
          speed: 1,
        }),
        mozjpeg({ quality: 100 }),
        // mozjpeg({ quality: 65 }),
        imagemin.svgo(),
        imagemin.optipng(),
        imagemin.gifsicle({ optimizationLevel: 3 }),
      ])
    )
    .pipe(gulp.dest(`${OUTDIR}/assets/img`));
};

const compileWebp = () => {
  return gulp
    .src([
      "./src/assets/img/**/*.{png,jpg,jpeg}",
      "!./src/assets/img/favicons/**/*",
    ])
    .pipe(webp())
    .pipe(gulp.dest(`${OUTDIR}/assets/img`));
};

const copyPhp = () => {
  return gulp.src("./src/template/**/*.php").pipe(gulp.dest(`${OUTDIR}`));
};

const watch = () => {
  gulp.watch("./src/assets/scss/**/*.scss", gulp.series("sass"));
  gulp.watch("./src/assets/js/**/*.js", gulp.series("js"));
  gulp.watch(
    "./src/assets/img/**/*.{png,jpg,jpeg,svg,ico}",
    gulp.series("image")
  );
  gulp.watch("./src/assets/img/**/*.{png,jpg,jpeg}", gulp.series("webp"));
  gulp.watch("./src/template/**/*.php", gulp.series("php"));
};

exports.upload = gulp.series(uploadSftp);

exports.sass = compileSass;
exports.js = compileJs;
exports.image = copyImage;
exports.webp = compileWebp;
exports.php = copyPhp;
exports.watch = watch;
exports.default = gulp.series(
  compileSass,
  compileJs,
  copyImage,
  compileWebp,
  copyPhp
);