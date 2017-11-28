// Modules
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
// Styles
import './styles/reset.css';
import './styles/main.css';
// Store
import configureStore from './store/configureStore';
// Containers
import App from './containers/App/App';

const store = configureStore();

render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
