module.exports = function(config) {
  config.set({
    basePath: '../.',
    frameworks: ['jasmine', 'sinon'],
    browsers: ['PhantomJS'],
    plugins: [
        'karma-phantomjs-launcher',
        'phantomjs-prebuilt',
        'karma-jasmine',
        'karma-sinon'
    ],
    files: [
        'src', 'test/src/*.test.js'
    ],
    singleRun: true
  });
};