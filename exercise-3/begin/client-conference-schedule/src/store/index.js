import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from '../domains';

const defaultEnhancers = applyMiddleware(thunk);
const enhancers = process.env.NODE_ENV === 'development' && window.devToolsExtension ? window.devToolsExtension() : (createStore) => createStore;

const configureStore = ({
  initialState = {},
}) => (
  createStore(
    combineReducers({ ...reducers }),
    initialState,
    compose(defaultEnhancers, enhancers)
  )
);

export default configureStore;
