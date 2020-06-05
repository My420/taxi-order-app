import { createStore, applyMiddleware } from 'redux';
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import reducer, { initialState } from '../ducks/orderForm';

const enhancer = applyMiddleware(ReduxThunk);

const withReduxDevTools = composeWithDevTools(enhancer);

const store = createStore(reducer, initialState, withReduxDevTools);

export type AppState = ReturnType<typeof reducer>;

export default store;
