import express from 'express';
import path from 'path';
import webpack from 'webpack';
import reactApp from '../app/server.js';

const {NODE_ENV: ENV, PORT=3000, HOST='0.0.0.0'} = process.env;
const app = express();

if (ENV === 'development') {
    const webpackConfigDev = require('../webpack/webpack.config.dev');
    const compiler = webpack(webpackConfigDev);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: webpackConfigDev.output.publicPath,
        stats: {
            colors: true
        }
    }));
    app.use(require('webpack-hot-middleware')(compiler));
} else if (ENV === 'production') {
    const webpackConfigProd = require('../webpack/webpack.config.prod');

    app.use(
        webpackConfigProd.output.publicPath,
        express.static(path.resolve(__dirname, '..', 'build'))
    );
}

app.get('/', reactApp);
app.listen(PORT, HOST, err => err
    ? console.error(err) //eslint-disable-line no-console
    : console.info(`Listening at http://${HOST}:${PORT}`) //eslint-disable-line no-console
);
