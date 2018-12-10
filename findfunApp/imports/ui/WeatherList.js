import { Meteor } from 'meteor/meteor';
import React from 'react';

import WeatherListItem from './WeatherListItem.js';

export default class WeatherList extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      error: '',
      weatherList: []
    };
  }

  componentDidMount() {
    if (this.props.city) {
      // get weather from server method (which calls Openweathermap API)
      Meteor.call('getWeatherResults', this.props.city, (err, res) => {
        if (err) {
          console.log('getWeatherResults err: ', err);
        } else {
          console.log('getWeatherResults res: ', res);
          // save weather data response to state
          this.setState({ weatherList: res });
        }
      });
    }
  }

  renderWeatherListItems() {
    if (this.state.weatherList) {
      // iterate through array of objects and render child component for each element
      return this.state.weatherList.map((weatherListItem) => {
        return (
          <WeatherListItem key={weatherListItem.dt} weatherListItem={weatherListItem} />
        );
      });
    }
  }

  render() {
    return (
      <div className="columns">
        {this.renderWeatherListItems()}
      </div>
    );
  }
}
