import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './components/App';

// redux support
import  { createStore , applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'; 
import thunk from 'redux-thunk';
import {
    routerMiddleware,
} from 'react-router-redux';
import rootReducer from './redux/reducers';
import { Router } from 'react-router-dom';

import history from './components/history';
import { CookiesProvider } from 'react-cookie';

// bootstrap styling 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './css/main.css';
import './fonts/iconic/css/material-design-iconic-font.min.css';
import './fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './css/search.css';
import './css/table.scss';

const middleware = [thunk, routerMiddleware(history)];

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(...middleware))
    );

ReactDOM.render(
    <CookiesProvider>
        <Router history={history}>
            <Provider store={store}>
                <App />
            </Provider>
        </Router>
    </CookiesProvider>,
    document.getElementById('app-root')
);

serviceWorker.unregister();
