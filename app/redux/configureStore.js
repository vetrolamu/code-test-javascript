import { createStore } from 'redux';
import rootReducer from './reducers';

const isDevelopment = process.env.NODE_ENV === 'development';

export default function configureStore() {
    return createStore(
        rootReducer,
        isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f);
}
