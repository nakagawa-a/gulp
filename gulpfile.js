var gulp = require("gulp");
var ejs = require("gulp-ejs");
var sass = require("gulp-sass");
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require("gulp-autoprefixer");
var plumber = require("gulp-plumber");
var htmlbeautify = require('gulp-html-beautify');
var rename = require('gulp-rename');

gulp.task("sass", function(cb) {
    return gulp.src("./scss/**/*.scss")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("./dist/css"));
});

gulp.task("ejs", function(cb) {

    return    gulp.src(['./ejs/**/*.ejs', '!./ejs/**/_*.ejs'])
            .pipe(plumber())
            .pipe(ejs())
            // index.htmlに名前を変更
            .pipe(rename({ extname: '.html' }))
            .pipe(htmlbeautify({
                "indent_size": 4
            }))
            .pipe(gulp.dest("./dist"));
  
});

gulp.task("default", function() {
    gulp.watch("./scss/**/*.scss", gulp.task('sass'));
    gulp.watch(['./ejs/**/*.ejs'], gulp.task("ejs"));
});

// gulp.task('default', gulp.parallel('ejs', 'sass'));
