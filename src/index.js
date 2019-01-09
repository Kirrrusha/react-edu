import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {normalizedArticles} from './fixtures';
import App from './app';
import store from './store';
import {Provider} from 'react-redux';
import HashRouter from "react-router-dom/es/HashRouter";


ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App/>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
