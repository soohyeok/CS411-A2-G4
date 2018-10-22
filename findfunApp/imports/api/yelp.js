import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import SimpleSchema from 'simpl-schema';

Meteor.methods({
  //method to call api and get daily schedule data
  getYelpData(search) {
    new SimpleSchema({
      search: {
        type: String,
      }
    }).validate({search});
    if (Meteor.isServer) {
      const apiKey = '7Hj3DSg2DV8kCD7G7RBH2Z7cv0tU4Utu8Bt5rvvcuSV9U7k59lX0TGbUct0kSHhPnIauVCQTuAH6nTnFXWBGGFg_S-MCaxK068KNygW1SqOG0_vi1VqwX3KUYejJW3Yx';
      const url = `https://api.yelp.com/v3/businesses/search`;
      const options = {
        params: {
          term: search,
          latitude: 37.786882,
          longitude: -122.399972,
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
