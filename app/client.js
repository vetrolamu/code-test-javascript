import React from 'react';
import ReactHotLoaderInjection from 'react-hot-loader/Injection';
import { render } from 'react-dom';

import Page from './components/page/page.jsx';

const rootInstance = render(
    <Page />,
    document.getElementById('app')
);

if (process.env.NODE_ENV === 'development' && module.hot) {
    ReactHotLoaderInjection.RootInstanceProvider.injectProvider({
        getRootInstances() {
            return [rootInstance];
        }
    });
}
