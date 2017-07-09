import {render} from 'react-dom';
import React from 'react';
import {Router, Route, hashHistory} from 'react-router';
import $ from 'jquery';

import App from './components/App'
import Home from './components/Home'

$(document).on('DOMContentLoaded', () => {
  hashHistory.listen( location =>  {
    $(window).scrollTo(0);
  });
  render((
    <Router history={hashHistory}>
      <Route component={App}>
        <Route path="/" component={Home} />
      </Route>
    </Router>
  ), document.querySelector('#main'));
});
