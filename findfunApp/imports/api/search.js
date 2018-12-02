import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import SimpleSchema from 'simpl-schema';

Meteor.methods({
  getWeatherResults(city) {
    new SimpleSchema({
      city: {
        type: String
      }
    }).validate({city});

    if (Meteor.isServer) {
      const apikey = Meteor.settings.private.YAHOO_WEATHER_API_KEY;
      const url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${city}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
      // const options = {
      //   params: {
      //     location: city,
      //     limit: 20
      //   },
      //   headers: {
      //     Authorization: `Bearer ${apikey}`
      //   },
      //   timeout: 30000
      // };
      this.unblock();
      try {
        // Synchronous GET Request
        const result = HTTP.get(url);
        // console.log('getYelpData result: ', result);
        if (result.statusCode === 200) {
          const responseJson = JSON.parse(result.content);
          console.log('getWeatherResults responseJson:', responseJson.query.results.forecast);
          const weatherForecast = responseJson.query.results.forecast;
          const weatherForecastFiveDays = weatherForecast.splice(0,5);
          return weatherForecastFiveDays;
        } else {
          // console.log("Response issue: ", result.statusCode);
          const errorJson = JSON.parse(result.content);
          throw new Meteor.Error(result.statusCode, errorJson.error);
        }
      } catch (error) {
        console.log('getWeatherResults: error', error);
      }
    }
  },
  getYelpResults(city, time) {
    new SimpleSchema({
      city: {
        type: String
      },
      time: {
        type: String
      },
    }).validate({city, time});

    if (Meteor.isServer) {
      const apikey = Meteor.settings.private.YELP_API_KEY;
      const url = `https://api.yelp.com/v3/businesses/search`;
      const options = {
        params: {
          term: 'restaurants',
          location: city,
          limit: 20
        },
        headers: {
          Authorization: `Bearer ${apikey}`
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
          // console.log('getYelpResults responseJson:', responseJson.businesses);
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
  },
  getDayActivities(city, time) {
    new SimpleSchema({
      city: {
        type: String
      },
      time: {
        type: String
      },
    }).validate({city, time});

    if (Meteor.isServer) {
      const apikey = Meteor.settings.private.YELP_API_KEY;
      const url = `https://api.yelp.com/v3/businesses/search`;
      const options = {
        params: {
          term: 'activities',
          location: city,
          limit: 20
        },
        headers: {
          Authorization: `Bearer ${apikey}`
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
          console.log('getYelpResults responseJson:', responseJson.businesses);
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
  },
  getTicketmasterResults(city, time) {
    new SimpleSchema({
      city: {
        type: String
      },
      time: {
        type: String
      },
    }).validate({city, time});

    if (Meteor.isServer) {
      const apikey = Meteor.settings.private.TICKETMASTER_API_KEY;
      const url = `https://app.ticketmaster.com/discovery/v2/events.json`;
      const options = {
        params: {
          apikey,
          city,
          size: 20,
          sort: 'date,desc',
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
          // console.log('getTicketmasterResults responseJson:', responseJson);
          return responseJson._embedded.events;
        } else {
          // console.log("Response issue: ", result.statusCode);
          const errorJson = JSON.parse(result.content);
          throw new Meteor.Error(result.statusCode, errorJson.error);
        }
      } catch (error) {
        console.log('getTicketmasterResults: error', error);
      }
    }
  }
});
