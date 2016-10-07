import React from 'react';
import ReactHotLoaderInjection from 'react-hot-loader/Injection';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './redux/configureStore';
import Page from './components/page/page.jsx';

const store = configureStore();
const rootInstance = render(
    <Provider store={store}>
        <Page />
    </Provider>,
    document.getElementById('app')
);

if (process.env.NODE_ENV === 'development' && module.hot) {
    ReactHotLoaderInjection.RootInstanceProvider.injectProvider({
        getRootInstances() {
            return [rootInstance];
        }
    });
}
