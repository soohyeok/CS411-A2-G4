import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  // send user profile data to client for logged in user
  getUserProfileData() {
    // throw error if user is not logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    if (Meteor.isServer) {
      const user = Meteor.user();
      const data = {
        name: user.name,
        picture_url: user.picture_url
      };
      return data;
    }
  }
});

// log in hook called by Meteor when a user account is created
// save the desired data received from Facebook profile
Accounts.onCreateUser((options, user) => {
  console.log('onCreateUser: ', user);
  if (!user.services.facebook) {
    return user;
  }

  // save name and picture url to top level fields
  // save email to expected field
  user.name = user.services.facebook.first_name;
  user.emails = [{
    address: user.services.facebook.email
  }];
  user.picture_url = user.services.facebook.picture.data.url;

  return user;
});
