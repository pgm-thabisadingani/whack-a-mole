import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    {process.env.NODE_ENV === 'production' ? (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    ) : (
      <App />
    )}
  </Provider>
);

reportWebVitals();
