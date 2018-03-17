

var concat = require('concat-files');

concat([
    "./lib/js/jquery.min.js",
    "./lib/js/proto-app-in-view.min.js",
    "./lib/js/proto-app-sticky-sidebar.min.js"
], './proto-app-lib.min.js', function (err) {
    if (err) throw err
    console.log('Bundling: proto-app-lib.min.js');
});

concat([
    "./lib/js/jquery.min.js",
    "./lib/js/proto-app-in-view.min.js",
    "./lib/js/proto-app-sticky-sidebar.min.js",
    "./lib/js/tether.min.js",
    "./lib/js/bootstrap.min.js"
], './proto-app-lib-article.min.js', function (err) {
    if (err) throw err
    console.log('Bundling: proto-app-lib-article.min.js');
});

