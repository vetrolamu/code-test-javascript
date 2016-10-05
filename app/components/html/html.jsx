import React from 'react';

const SCRIPTS = {
    production: [
        {src: 'https://unpkg.com/react@15.3.2/dist/react.min.js'},
        {src: 'https://unpkg.com/react-dom@15.3.2/dist/react-dom.min.js'},
        {src: '/static/bundle.js'}
    ],
    development: [
        {src: 'https://unpkg.com/react@15.3.2/dist/react.js'},
        {src: 'https://unpkg.com/react-dom@15.3.2/dist/react-dom.js'},
        {src: '/static/bundle.js'}
    ]
};

const STYLESHEETS = {
    production: [
        {rel: 'stylesheet', href: '/static/bundle.css'}
    ],
    development: []
};

const Html = () => (
    <html>
        <head>
            <title>Bowling Game</title>
            {STYLESHEETS[process.env.NODE_ENV].map((props, key) =>
                <link {...props} key={key} />
            )}
            {SCRIPTS[process.env.NODE_ENV].map((props, key) =>
                <script defer {...props} key={key} />
            )}
        </head>
        <body>
            <div id="app" />
        </body>
    </html>
);

export default Html;
