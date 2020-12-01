import { IntlProvider } from '@redhat-cloud-services/frontend-components-translations';
import {
    createFetchingClient,
    getInsights,
    getStore,
    initStore
} from '@redhat-cloud-services/insights-common-typescript';
import { validateSchemaResponseInterceptor } from 'openapi2typescript/react-fetching-library';
import React from 'react';
import ReactDOM from 'react-dom';
import { ClientContextProvider } from 'react-fetching-library';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import logger from 'redux-logger';

import messages from '../locales/data.json';
import App from './app/App';
import { getBaseName } from './utils/Basename';

const client = createFetchingClient(getInsights, {
    responseInterceptors: [ validateSchemaResponseInterceptor ]
});
initStore(logger);

ReactDOM.render(
    <IntlProvider locale={ navigator.language.slice(0, 2) } messages={ messages } onError={ console.log }>
        <Provider store={ getStore() }>
            <Router basename={ getBaseName(window.location.pathname) }>
                <ClientContextProvider client={ client }>
                    <App />
                </ClientContextProvider>
            </Router>
        </Provider>
    </IntlProvider>,

    document.getElementById('root')
);
