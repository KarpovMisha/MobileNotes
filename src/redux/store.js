import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import loggingMiddleware from './middleware/logging';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState = {}) => {
  const middleware = composeEnhancers(applyMiddleware(thunk, loggingMiddleware));

  return createStore(rootReducer, initialState, middleware);
};

export default configureStore;
