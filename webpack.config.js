const webpack = require('webpack');
const minifier = require('minifier');
const data = require('./webpack.config.data.js');
const data_init = require('./webpack.config.data-init.js');
const home = require('./webpack.config.home.js');
const article = require('./webpack.config.article.js');
const compendium = require('./webpack.config.compendium.js');
const init = require('./webpack.config.init.js');

let input, options;

input = ['./src/css/grid.css', './src/css/navbar.css', './src/css/new_navbar.css', './src/css/common.css','./src/css/new_style.css'];
options = {
  output: "proto-app-main.min.css"
}
minifier.minify(input, options);

input = ['./src/css/fonts.css'];
options = {
  output: "proto-app-fonts.min.css"
}
minifier.minify(input, options);

input = ['proto-app-main.min.css','proto-app-lib.min.css'];
options = {
  output:"proto-app-style.min.css"
}
minifier.minify(input, options);

module.exports = [
  data, data_init, home, article, compendium, init
];
