const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackConfigBase = require('./webpack.config.base');

module.exports = Object.assign(webpackConfigBase, {
    entry: path.resolve(__dirname, '..', 'app', 'client.js'),
    output: {
        path: path.resolve(__dirname, '..', 'build'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('bundle.css')
    ],
    module: {
        loaders: [
            {
                test: /\.js$|\.jsx$/,
                loader: 'babel',
                include: path.resolve(__dirname, '..', 'app')
            },
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract('style', 'css!sass!postcss'),
                include: path.resolve(__dirname, '..', 'app')
            }
        ]
    }
});
