import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './store/reducers' 
import middleware from './store/middleware' 
//import { PersistGate } from 'redux-persist/lib/integration/react'
//import { persistor, store } from './store'

const store = createStore(reducer, middleware)

ReactDOM.render(
  <Provider store={store}>
    {/*<PersistGate persistor={persistor}>*/}
      <App />
    {/*</PersistGate>*/}
  </Provider>,
  document.getElementById('root')
);
