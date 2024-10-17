'use strict';

var webpack = require('webpack');

module.exports = {
    entry: {
        'gamepad-api': './index.js',
        'gamepad-api.min': './index.js'
    },

    output: {
        library: 'gamepad-api',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        filename: '[name].js',
        path: './dist/'
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ]
};
