module.exports = function(config) {
  config.set({

    basePath: '',
    frameworks: ['jasmine'],
    files: [
        'vendor/js/underscore.min.js',
        'vendor/js/jquery-2.1.1.min.js',
        'src/deep_observe.js',
        'test/*.js'
    ],

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
