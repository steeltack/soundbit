import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { 
  createStore, 
  applyMiddleware,
  compose
} from 'redux';

import { rootReducer } from '../reducers';
// import DevTools from '../containers/DevTools';

const configureStore = (preloadedState) =>
    createStore(
        rootReducer,
        preloadedState,
        compose(
        applyMiddleware(thunk, logger),
            // DevTools.instrument(),
        )
    );


export default configureStore;