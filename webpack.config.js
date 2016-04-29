// List of issues solved
// https://github.com/airbnb/enzyme/issues/47
// https://github.com/cheeriojs/cheerio/issues/836
// https://github.com/airbnb/enzyme/issues/286
// https://github.com/airbnb/enzyme/issues/309
const path = require('path');
const webpack = require('webpack');

const buildDirectory = './dist/';

module.exports = {
  // entry: 'mocha!../ux/lib/react/components/test/testAddressForm.js',
  entry: 'mocha!../ux/lib/react/components/test/index.js',
  devServer: {
    hot: true,
    inline: true,
    port: 7700,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(buildDirectory),
    filename: 'app.js',
    publicPath: 'http://localhost:7700/dist',
  },
  devtool: 'source-map',
  externals: {
     'react/addons': true,
     'react/lib/ExecutionEnvironment': true,
     'react/lib/ReactContext': true
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-0'],
      },
    },
    {
      test: /\.json$/,
      loader: 'json',
    }
  ],
  },
  plugins: [
    new webpack.IgnorePlugin(/jsdom$/),
    new webpack.NormalModuleReplacementPlugin(/^\.\/package$/, function(result) {
    if(/cheerio/.test(result.context)) {
        result.request = "./package.json"
    }
})
  ],
};
