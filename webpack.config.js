const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const sourcemapsOptions = {
    filename: '[name].js.map',
};

const config = {
    entry: './app/js/main.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },

    plugins: [
        new UglifyJSPlugin({
            sourceMap: true,
            ecma: 8
        }),
        new webpack.SourceMapDevToolPlugin(sourcemapsOptions)
    ]

}

module.exports = config;