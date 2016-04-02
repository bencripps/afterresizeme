module.exports = function(config) {
  config.set({
    basePath: '../.',
    frameworks: ['jasmine', 'sinon'],
    files: [
        'src', 'test/src/*.test.js'
    ]
  });
};