const webpack = require('webpack');
const minifier = require('minifier');
const card = require('./webpack.config.data.js');
const home = require('./webpack.config.home.js');
const findings = require('./webpack.config.findings.js');
const init = require('./webpack.config.init.js');

let input, options;

input = ['./src/css/grid.css', './src/css/navbar.css', './src/css/common.css'];
options = {
  output: "proto-app-style.min.css"
}
minifier.minify(input, options);

input = ['./src/css/fonts.css'];
options = {
  output: "proto-app-fonts.min.css"
}
minifier.minify(input, options);

module.exports = [
  card, home, findings, init
];
