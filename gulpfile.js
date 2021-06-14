var gulp = require("gulp");
var ejs = require("gulp-ejs");
var sass = require("gulp-sass");
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require("gulp-autoprefixer");
var plumber = require("gulp-plumber");
var htmlbeautify = require('gulp-html-beautify');
var rename = require('gulp-rename');

gulp.task("sass", function() {
    gulp.src("css/**/*.scss")
        .pipe(plumber())
        // .pipe(compass({
        //     config_file: 'config.rb',
        //     comments: false,
        //     css: 'css/',
        //     sass: 'css/'
        // }))
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("./css"));
});

gulp.task("ejs", function() {
    gulp.src(['./ejs/**/*.ejs'], function(e) {

        return gulp.src(['./ejs/**/*.ejs', '!./ejs/**/_*.ejs'])
            .pipe(plumber())
            // オブジェクトを渡してデータの当て込み
            .pipe(ejs())
            // index.htmlに名前を変更
            .pipe(rename({ extname: '.html' }))
            .pipe(htmlbeautify({
                "indent_size": 4
            }))
            .pipe(gulp.dest("./"))

    });
});

gulp.task("default", function() {
    gulp.watch("css/**/*.scss", ["sass"]);
    gulp.watch(['./ejs/**/*.ejs', './ejs/**/*.json'], ["ejs"]);
});
