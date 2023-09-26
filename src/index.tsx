import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorFallback from './ErrorBoundery/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apolloClient';
import { Provider } from 'react-redux';
import { store } from './redux/persist';
import 'normalize.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <Router>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <App />
          </ErrorBoundary>
        </Router>
      </ApolloProvider>
    </Provider>
);



reportWebVitals();
