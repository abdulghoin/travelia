var debug   = true;
var webpack = require('webpack');
var path    = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './js/app.js',
  output: {
    path: __dirname + '/src/',
    filename: 'app.min.js'
  },
  resolve: {
    // root: __dirname,
    modules: [
      'node_modules',
      'src/js',
      'src/js/actions',
      'src/js/components',
      'src/js/layout',
      'src/js/pages',
      'src/js/reducers'
    ],
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  devtool: debug ? 'inline-sourcemap' : 'cheap-module-source-map',
  plugins: debug ? [] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourceMap: true, minimize: true }),
  ],
};
