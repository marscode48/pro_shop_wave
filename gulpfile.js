const { src, dest, watch, series, parallel, lastRun } = require("gulp");
const loadPlugins = require("gulp-load-plugins");
const $ = loadPlugins();
const pkg = require("./package.json");
const del = require("del");
const webp = require("gulp-webp");
const sass = require("sass");
const browserSync = require("browser-sync").create();
const isProd = process.env.NODE_ENV === "production";

// **ファイルのパス設定**
const paths = {
  styles: {
    src: "src/sass/**/*.scss",
    dest: "dist/css"
  },
  scripts: {
    src: "src/js/**/*.js",
    dest: "dist/js"
  },
  images: {
    src: "src/images/**/*.{jpg,jpeg,png,svg,gif,webp}",
    dest: "dist/images"
  },
  html: {
    src: "src/*.html",
    dest: "dist/"
  },
  php: {
    src: "src/**/*.php",
    dest: "dist/"
  }
};

// **Sassのコンパイル**
function styles() {
  return src(paths.styles.src)
    .pipe($.plumber({ errorHandler: $.notify.onError("Sass Error: <%= error.message %>") }))
    .pipe($.if(!isProd, $.sourcemaps.init()))
    .pipe($.dartSass({ 
      outputStyle: isProd ? "compressed" : "expanded", 
      logger: sass.logger, // Loggerを適用してSass のエラーをカスタマイズ
      silenceDeprecations: ["legacy-js-api"] // 警告を非表示
    }))
    .pipe($.autoprefixer({ cascade: true }))
    .pipe($.if(!isProd, $.sourcemaps.write(".")))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}


// **JSの処理**
function scripts() {
  return src(paths.scripts.src)
    .pipe($.if(!isProd, $.sourcemaps.init()))
    .pipe($.if(isProd, $.uglify()))
    .pipe($.if(!isProd, $.sourcemaps.write(".")))
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// **画像圧縮 + WebP変換**
function images() {
  return src(paths.images.src, { since: lastRun(images) })
    .pipe($.imagemin([
      $.imagemin.gifsicle({ interlaced: true }),
      $.imagemin.mozjpeg({ quality: 75, progressive: true }),
      $.imagemin.optipng({ optimizationLevel: 5 }),
      $.imagemin.svgo({ plugins: [{ removeViewBox: true }, { cleanupIDs: false }] })
    ]))
    .pipe(dest(paths.images.dest)) // 通常の画像を保存
    .pipe(webp()) // WebP 変換
    .pipe(dest(paths.images.dest)); // WebP 画像を保存
}

// **HTMLのコピー処理**
function html() {
  return src(paths.html.src).pipe(dest(paths.html.dest)).pipe(browserSync.stream());
}

// **PHPのコピー処理**
function php() {
  return src(paths.php.src).pipe(dest(paths.php.dest)).pipe(browserSync.stream());
}

// **ファイルの変更監視**
function startAppServer() {
  browserSync.init({
    server: {
      baseDir: "dist",
      index: "index.html"
    },
    // startPath: "index.html"
    startPath: "home.html"
  });

  watch(paths.styles.src, styles);
  watch(paths.scripts.src, scripts);
  watch(paths.images.src, images);
  watch(paths.html.src, html);
  watch(paths.php.src, php);
  watch("dist/**/*").on("change", browserSync.reload);
}

// **ビルドのクリーンアップ**
function clean() {
  return del(["dist"]);
}

// **タスクの登録**
const build = series(clean, parallel(images, html, php, styles, scripts));
const serve = series(build, startAppServer);

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.html = html;
exports.php = php;
exports.build = build;
exports.serve = serve;
exports.default = serve;
