import App from './components/App';
import { createElement } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/citations';
import thunkFSA from 'redux-thunk-fsa';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunkFSA)));

ReactDOM.render(
  createElement(Provider, { store }, createElement(App)),
  document.getElementById('root'),
);
