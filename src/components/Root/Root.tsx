import React from 'react';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../../store/store';

const Root: React.FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
