const {src, dest, parallel, watch} = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');

function js(cb) {
    src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('lib'))
        .pipe(dest('example'));
    cb()
}

function css(cb) {
    src('./src/log-slider.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./example/assets'))
        .pipe(dest('./lib'));
    cb()
}

exports.default = parallel(js, css);

exports.watch = function() {
    watch('src/*.css', css);
    watch('src/*.js', js);
};
