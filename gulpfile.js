var gulp = require('gulp');
var uglify = require('gulp-uglify'); //https://www.npmjs.com/package/gulp-uglify
var livereload = require('gulp-livereload'); // Also Need to install live reload extension to chrome
var concat = require('gulp-concat'); // Combines multiple files into one
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');

const autoprefixer = require('gulp-autoprefixer'); // Adds in prefix for prowsers (-webkit etc)
const cleanCSS = require('gulp-clean-css'); // replaces gulp-minify-css to minify css
const plumber = require('gulp-plumber'); // Prevent pipe breaking caused by errors from gulp plugins


var STYLES_LC = './dist/styles';
var SCRIPTS_LC = './dist/scripts';

var SCRIPTS_PATH = './src/scripts/**/*.ts';
var SCSS_PATH = './src/scss/**/*.scss';


// Styles For SCSS
gulp.task('styles', function () {
    console.log('Starting styles task');
    return gulp.src([SCSS_PATH])         
        .pipe(sass())
        // Plumber for error handling 
        .pipe(plumber(function (err) {
            console.log('Styles Task Error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(concat('styles.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(STYLES_LC))
        .pipe(livereload());
});



// Scripts for Typescript
gulp.task('scripts', function () {
    console.log('Starting scripts task');
    // src array to allow file ordering
    return gulp.src([SCRIPTS_PATH])
        // Plumber for error handling 
        .pipe(plumber(function (err) {
            console.log('Scripts Task Error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated
        .pipe(ts({
            target: "es5",
            module: "AMD", // requirejs
            noImplicitAny: true,
            outFile: 'main.js'
        }))
        .pipe(uglify())  // Minifies file
        .pipe(sourcemaps.write()) // comment this out for production
        .pipe(gulp.dest(SCRIPTS_LC))
        .pipe(livereload());
});


gulp.task('watch', function () {
    console.log('Starting watch task');
    require('./server.js');
    livereload.listen();
    gulp.watch(SCRIPTS_PATH, ['scripts']);
    gulp.watch(SCSS_PATH, ['styles']);
});
