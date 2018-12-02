import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// route components
import LandingPage from '../ui/LandingPage.js';
import SearchResults from '../ui/SearchResults.js';
import NotFound from '../ui/NotFound.js';

export const routes = (
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={LandingPage} />
    <Route path="/s/:city/:time" component={SearchResults} />
    <Route path="*" component={NotFound} />
  </Router>
);
