import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from './reducers';

const middleware = applyMiddleware(thunk, logger);

export default createStore(reducer, composeWithDevTools(middleware));