const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-hot-middleware/client',
        path.resolve(__dirname, '..', 'app', 'client.js')
    ],
    output: {
        path: path.resolve(__dirname, '..', 'app'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$|\.jsx$/,
                loaders: ['react-hot', 'babel'],
                include: path.resolve(__dirname, '..', 'app')
            },
            {
                test: /\.scss/,
                loader: 'style!css!sass!postcss',
                include: path.resolve(__dirname, '..', 'app')
            }
        ]
    },
    postcss() {
        return [autoprefixer];
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    }
};
