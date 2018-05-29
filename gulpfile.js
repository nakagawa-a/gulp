var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require("gulp-autoprefixer");
var plumber = require("gulp-plumber");
var compass = require('gulp-compass');

gulp.task("sass", function() {
    gulp.src("css/**/*.scss")
        .pipe(plumber())
        .pipe(compass({
            config_file: 'config.rb',
            comments: false,
            css: 'css/',
            sass: 'css/'
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("./css"));
});

gulp.task("default", function() {
    gulp.watch("css/**/*.scss", ["sass"]);
});
