ServiceConfiguration.configurations.upsert({
  service: 'facebook'
}, {
  $set: {
    loginStyle: 'popup',
    appId: Meteor.settings.private.FACEBOOK_APP_ID,
    secret: Meteor.settings.private.FACEBOOK_SECRET
  }
});
