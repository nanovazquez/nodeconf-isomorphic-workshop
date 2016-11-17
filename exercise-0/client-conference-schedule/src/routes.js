import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from './containers/Home';
import Details from './containers/Details';

const routes = (
  <Route path="/">
    <IndexRoute component={Home}/>
    <Route path="/users/:twitter" component={Details} />
  </Route>
);

export default routes;
