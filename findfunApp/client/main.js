import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';

import { routes, onAuthChange } from '../imports/routes/routes.js';

// keep track of user's authentication state and redirect user appropriately with onAuthChange
Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

// start app 
Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
