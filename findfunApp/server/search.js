import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import SimpleSchema from 'simpl-schema';

// DESCRIPTION:
// server methods to be called from client to get data from API's

// SECURITY:
// all API keys are stored in environment variables than are set when the application is started
// API keys are never stored in plain text in the app code
//
// All data received from the client is checked and cleaned using the SimpleSchema package

Meteor.methods({
  getWeatherResults(city) {
    // clean data received from client
    new SimpleSchema({
      city: {
        type: String
      }
    }).validate({city});

    if (Meteor.isServer) {
      const apikey = Meteor.settings.private.OPENWEATHER_API_KEY;
      const url = `http://api.openweathermap.org/data/2.5/forecast`;
      const options = {
        params: {
          q: city,
          APPID: apikey
        },
        timeout: 30000
      };
      this.unblock();
      try {
        // Synchronous GET Request
        const result = HTTP.get(url, options);
         //console.log('getWeatherResults result: ', result);
        if (result.statusCode === 200) {
          const responseJson = JSON.parse(result.content);
          // console.log("weather responseJson: ", responseJson);

          // weather response gives weather forecasts for every 3 hours for the next 5 days
          // loop through the results and save one forecast for each day to get a forecast for the following 5 days
          let weatherList = [];
          let lastWeatherDayStored = '';
          responseJson.list.forEach((value) => {
            const date = value.dt_txt.slice(0, 10);
            if (lastWeatherDayStored !== date) {
              lastWeatherDayStored = date;
              weatherList.push(value);
            }
          });
          return weatherList.splice(0,5);
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
    // clean data received from client
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
    // clean data received from client
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
        // console.log('getDayActivities result: ', result);
        if (result.statusCode === 200) {
          const responseJson = JSON.parse(result.content);
          // console.log('getDayActivities responseJson:', responseJson.businesses);
          return responseJson.businesses;
        } else {
          // console.log("Response issue: ", result.statusCode);
          const errorJson = JSON.parse(result.content);
          throw new Meteor.Error(result.statusCode, errorJson.error);
        }
      } catch (error) {
        console.log('getDayActivities: error', error);
      }
    }
  },
  getTicketmasterResults(city, time) {
    // clean data received from client
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
        // console.log('getTicketmasterResults result: ', result);
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
