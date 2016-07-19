const webpack = require('webpack');
const config = require('./webpack.config');

var compiler = webpack(config);


compiler.run(function(err, stats) {
    console.log('Process Complete!')
    process.exit()
});

