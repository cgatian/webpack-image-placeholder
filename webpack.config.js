var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path'); 

var config = {
   entry: "./src/entry.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
   },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html'
        })
  ],
    module: {
        loaders: [
            { test: /\.jpg$/, loader: "../imageResizer" },
        ]
    }
};

module.exports = config;