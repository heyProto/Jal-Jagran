const webpack = require('webpack');
const minifier = require('minifier');

// CSS bundle
const input = ['./src/css/article.css','./src/css/compendium.css'];
const options = {
  output: "proto-app-compendium.min.css"
};
minifier.minify(input, options);

module.exports = {
  entry: {
    app: './main-findings.js'
  },
  output: {
    path: __dirname,
    filename: 'proto-app-article.min.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  node: {
    net: 'empty',
    tls: 'empty',
    fs: 'empty'
  },
  devServer: {
    disableHostCheck: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query:
        {
          presets:['react']
        }
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};