const { parallel, dest } = require('gulp');

let gulp = require('gulp'),
    sass = require('gulp-sass'), //^ sass в css;
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'), //^ Для минификации файлов js;
    concat = require('gulp-concat'), //^ Для конкатизации обединения строк, файлов js;
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');

//* clean
gulp.task('clean', async function() {
    del.sync('dist')

});



gulp.task('scss', function() {
    return gulp.src('app/scss/**/*.scss') //^ дял того что бы смотреть(конвертировать) за двумя типами файлов надо .(scss|sass);
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions'],
            cascade: false
        }))
        .pipe(rename({ suffix: '.min' })) //^ Что бы в конце слова было min;
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }));

});

//* Библиотека css обединения файлов

gulp.task('css', function() {
    gulp.src([
            'node_modules/normalize.css/normalize.css',
        ])
        .pipe(concat('_libs.scss'))
        .pipe(gulp.dest('app/scss'))

    .pipe(browserSync.reload({ stream: true }));

});




//* BrowserSync html

gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }));
});


gulp.task('script', function() {
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({ stream: true }));
});


//* JavaScript

gulp.task('js', function() {
    return gulp.src([
            './app/js/modal.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({ stream: true }));

});


//*BrowserSync
// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

//*dist Html
gulp.task('export', function() {
    let buildHtml = gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist'));


    let buildCss = gulp.src('app/css/**/*.css')
        .pipe(gulp.dest('dist/css'));

    let buildJs = gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('dist/js'));

    let buildFonts = gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'));

    buildImages = gulp.src('app/images/**/*.*')
        .pipe(gulp.dest('dist/images'));
});





//* Watcher

gulp.task('watch', function() {

    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('app/*.html', gulp.parallel('html'))
    gulp.watch('app/js/*.js', gulp.parallel('script'))
});


gulp.task('build', gulp.series('clean', 'export'));

gulp.task('default', gulp.parallel('css', 'scss', 'js', 'browser-sync', 'watch'));