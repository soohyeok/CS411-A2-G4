import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import SimpleSchema from 'simpl-schema';

Meteor.methods({
  //method to call api and get daily schedule data
  getYelpData(longitude, latitude, search) {
    new SimpleSchema({
      longitude: {
        type: String
      },
      latitude: {
        type: String
      },
      search: {
        type: String
      }
    }).validate({longitude, latitude, search});
    if (Meteor.isServer) {
      const apiKey = Meteor.settings.private.YELP_API_KEY;
      const url = `https://api.yelp.com/v3/businesses/search`;
      const options = {
        params: {
          term: search,
          longitude: -122.399972,
          latitude: 37.786882,
          limit: 5
        },
        headers: {
          Authorization: `Bearer ${apiKey}`
        },
        timeout: 30000
      };
      this.unblock();
      try {
        // Synchronous GET Request
        const result = HTTP.get(url, options);
        // console.log('getYelpData result: ', result);
        if (result.statusCode === 200) {
          const responseJson = JSON.parse(result.content);
          // console.log('responseJson:', responseJson);
          return responseJson.businesses;
        } else {
          // console.log("Response issue: ", result.statusCode);
          const errorJson = JSON.parse(result.content);
          throw new Meteor.Error(result.statusCode, errorJson.error);
        }
      } catch (error) {
        console.log('getYelpData: error', error);
      }
    }
  }
});
