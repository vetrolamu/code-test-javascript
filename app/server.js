import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Html from './components/html/html.jsx';

export default (req, res) => {
    res
        .status(200)
        .send(`<!DOCTYPE html>${renderToStaticMarkup(React.createElement(Html))}`);
};
