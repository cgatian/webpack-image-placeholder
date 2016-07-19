var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path'); 

var config = {
   entry: path.resolve(__dirname,  "./src/entry.js"),
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
            { test: /\.jpg$/, loader: path.resolve(__dirname, "../index.js") },
        ]
    }
};

module.exports = config;