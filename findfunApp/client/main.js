import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';

import { routes } from '../imports/routes/routes.js';

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
