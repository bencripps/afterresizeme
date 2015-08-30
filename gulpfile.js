/* 
* @Author: ben_cripps
* @Date:   2015-08-29 13:12:36
* @Last Modified by:   ben_cripps
* @Last Modified time: 2015-08-30 15:44:33
*/

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    dirs = {
        src: '/src/*.js',
        dist: '/dist/'
    };

var tasks = {
    default: {
        fn: function() {
            return gulp.src(dirs.src)
                .pipe(uglify())
                .pipe(gulp.dest(dirs.dist));
        },
        deps: []
    }
};

Object.keys(tasks).forEach(function(tsk){
    gulp.task(tsk, tasks[tsk].deps, tasks[tsk].fn);
});