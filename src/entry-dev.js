import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { init } from 'Store';
import App from './App';
import logger from 'redux-logger';

// exposes webpack variable RELEASE
/*global RELEASE:true*/
/*eslint no-undef: "error"*/

/**
 * Hooks up redux to app.
 *  https://redux.js.org/advanced/usage-with-react-router
 */
ReactDOM.render(
    <Provider store={ init(logger).getStore() }>
        <Router basename={ `/${RELEASE}/platform/notifications` }>
            <App/>
        </Router>
    </Provider>,

    document.getElementById('root')
);
