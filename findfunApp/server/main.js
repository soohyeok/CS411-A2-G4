import { Meteor } from 'meteor/meteor';

// import server files
import './search.js';
import './users.js';

import './ServiceConfiguration.js';

import '../imports/api/bookmarks.js';

Meteor.startup(() => {
  // code to run on server at startup
});
