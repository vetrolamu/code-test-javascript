import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import reactApp from '../app/server.js';
import webpackConfigDev from '../webpack/webpack.config.dev';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';
const app = express();
const compiler = webpack(webpackConfigDev);

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfigDev.output.publicPath,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));
app.get('/', reactApp);
app.listen(PORT, HOST, err => err
    ? console.error(err)
    : console.info(`Listening at http://${HOST}:${PORT}`)
);
