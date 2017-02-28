module.exports = function (config) {
	'use strict';

	config.set({
        browserNoActivityTimeout: 20000,
		basePath: '../../',
		files: [
		    // Dependencies
            'app/bower_components/jquery/dist/jquery.js',
			'app/bower_components/angular/angular.js',
			'app/bower_components/angular-route/angular-route.js',
			'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-resource/angular-resource.js',
            'app/bower_components/angular-animate/angular-animate.js',

			// Register app first
            'app/js/app.js',

            // Register modules first
            'app/js/components/**/module.js',

            // Load all other source files except component.js files
            'app/js/components/**/!(component).js',

            // Load reference json files for testing

            // Load all component.js to register controllers, services, etc
            'app/js/components/**/component.js',

            // Common test helpers
            'test/unit/common/**/*.js',

            // Test specs
            'test/unit/**/*.js',

            // Exclude
            {pattern: 'app/js/**/*.ts', included: false},
            {pattern: 'app/js/**/*.js.map', included: false},
            {pattern: 'test/**/*.ts', included: false}
		],
		autoWatch: true,
		singleRun: false,
        frameworks: ['jasmine'],
		browsers: [
			'Chrome'
		],
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine'
        ]
	});
};
