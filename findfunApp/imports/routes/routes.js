import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// route components
import LandingPage from '../ui/LandingPage.js';
import SearchResults from '../ui/SearchResults.js';
import Profile from '../ui/Profile.js';
import Login from '../ui/Login.js';
import Signup from '../ui/Signup.js';
import NotFound from '../ui/NotFound.js';

const unauthenticatedPages = ['/signup', '/login'];
const authenticatedPages = ['/profile'];

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/');
  }
};

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

const onEnterNotFound = () => {
  browserHistory.replace('/');
}

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/');
    // console.log('logged in => home');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
    // console.log('not logged in => landing page');
    //need to do this for outlines and papers routes
  }
};

export const routes = (
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={LandingPage} />
    <Route path="/s/:city/:time" component={SearchResults} />
    <Route path="/profile" component={Profile} onEnter={onEnterPrivatePage} />
    <Route path="/login" component={Login} onEnter={onEnterPublicPage} />
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
    <Route path="*" component={NotFound} />
  </Router>
);
