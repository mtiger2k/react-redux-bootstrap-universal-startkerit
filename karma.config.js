const webpack = require('webpack');
// See issues for details on parts of this config.
// https://github.com/airbnb/enzyme/issues/47
// had issues loading sinon as its a dep of enzyme
var argv = require('minimist')(process.argv.slice(2));


module.exports = (config) => {
  config.set({
    browsers: [ 'PhantomJS' ], // run in Chrome
    singleRun: argv.watch ? false : true, // just run once by default
    frameworks: [ 'mocha' ], // use the mocha test framework
    files: [
      'tests.webpack.js', // just load this file
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ], // preprocess with webpack and our sourcemap loader
	  'source/**/*.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'dots', 'progress', 'coverage' ], // report results in this format
    webpack: { // kind of a copy of your webpack config
      devtool: 'inline-source-map', // just do inline source maps instead of the default
      module: {
        preLoaders: [{
          test: /\.(js|jsx)$/,
          include: /source/,
          exclude: /(test|node_modules)/,
          loader: 'isparta'
        }],
        loaders: [{
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loaders: ['babel']
        }, 
        {
          test: /sinon\.js$/,
          loader: 'imports?define=>false,require=>false'
        }
        ]
      },
      isparta: {
        embedSource: true,
        noAutoWrap: true,
        // these babel options will be passed only to isparta and not to babel-loader
		babel: {
            presets: ['es2015', 'react']
        }
      },
      externals: {
        jsdom: 'window',
        cheerio: 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
        'text-encoding': 'window'
      },
      resolve: {
        alias: {
          sinon: 'sinon/pkg/sinon'
        }
      }
    },

    webpackServer: {
      noInfo: false // please don't spam the console when running in karma!
    },
	
	coverageReporter: {
    type: 'html', // default html
    dir: 'coverage'
	}
  });
};
