const gulp = require("gulp"); 
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");

sass.compiler = require("node-sass");

function html(done){
    gulp.src("./src/html/templates/*.ejs")
        .pipe(ejs())
        .pipe(rename(function(path){
            path.extname = ".html"
        }))
        .pipe(gulp.dest("./dist"))
        .pipe(connect.reload());
    done();
}

function watchHtml(done){
    gulp.watch("./src/html/**/*.ejs", { ignoreInitial: false }, html);
}

function scss(done){
    gulp.src("./src/css/**/*.scss")
        .pipe(sass().on("error", err => console.log(err)))
        .pipe(gulp.dest("./dist/assets/css"))
        .pipe(connect.reload());
    done();
}

function watchScss(){
    gulp.watch("./src/css/**/*.scss", { igonreInitial: false }, scss);
}

function js(done){
    gulp.src("./src/js/**/*.js")
        .pipe(gulp.dest("./dist/assets/js"))
        .pipe(connect.reload());
    done();
};

function watchJs(){
    gulp.watch("./src/js/**/*.js", { igonreInitial: false }, js);
}

function images(done){
    gulp.src("./src/images/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/assets/images"))
        .pipe(connect.reload());
    done();
}

function watchImages(){
    gulp.watch("./src/images/**/*", { ignoreInitial: false }, images);
}

function manifest(done){
    gulp.src('./manifest.webmanifest')
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
    done();
}
function watchManifest(done) {
    gulp.watch('./manifest.webmanifest', { ignoreInitial: false }, manifest);
}

function serviceWorker(done){
    gulp.src('./src/*.js')
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
    done();
}
function watchServiceWorker() {
    gulp.watch('./src/*.js', { ignoreInitial: false }, serviceWorker);
}

gulp.task("dev", function(done){
    watchHtml();
    watchScss();
    watchJs();
    watchImages();
    watchManifest();
    watchServiceWorker();
    connect.server({
        livereload: true,
        root: "dist"
    });
    done();
});

gulp.task("build", function(done){
    html(done);
    scss(done);
    js(done);
    images(done);
    manifest(done);
    serviceWorker(done);
    done();
});