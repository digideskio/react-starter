const PATH = require('path');

const gulp = require('gulp');
const gutil = require('gulp-util');

const webpack = require("webpack");

const ROOT = '../../';

const WEBPACK_CONFIG = PATH.resolve(__dirname, ROOT, 'tools/build/config/webpack-config.js');
const config = require(WEBPACK_CONFIG);

const compiler = webpack(config);

const printReport = function(stats) {
    gutil.log('[webpack]', stats.toString({
        modules: false,
        errorDetails: false,
        timings: false,
        cached: false,
        colors: true
    }));
};

gulp.task('build:app', (callback) => {
    compiler.run(function(err, stats) {
        if(err) {
            gutil.log('error', new gutil.PluginError('[webpack]', err));
        }

        printReport(stats);
        callback();
    });
});

gulp.task('build:watch:app', (callback) => {
    compiler.watch({
        aggregateTimeout: 300
    }, function(err, stats) {
        if(err) {
            gutil.log('error', new gutil.PluginError('[webpack]', err));
        }

        printReport(stats);
    });

    callback();
});