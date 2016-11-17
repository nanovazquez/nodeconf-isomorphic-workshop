import React from 'react';
import { Router, browserHistory }  from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import configureStore from './store';

const App = ({
  initialState,
}) => {
  const store = configureStore({ initialState });
  return (
    <Provider store={store} key="provider">
      <Router history={browserHistory} routes={routes} />
    </Provider>
  );
};

export default App;
