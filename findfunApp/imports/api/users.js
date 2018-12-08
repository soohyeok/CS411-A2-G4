import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  getUserProfileData() {
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

Accounts.onCreateUser((options, user) => {
  console.log('onCreateUser: ', user);
  if (!user.services.facebook) {
    return user;
  }
  user.name = user.services.facebook.first_name;
  user.emails = [{
    address: user.services.facebook.email
  }];
  user.picture_url = user.services.facebook.picture.data.url;

  return user;
});
