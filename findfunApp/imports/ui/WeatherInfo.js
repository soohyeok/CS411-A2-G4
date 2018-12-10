import { Meteor } from 'meteor/meteor';
import React from 'react';
import WeatherInfoList from './WeatherInfoList.js';

export default class WeatherInfo extends React.Component
{
  constructor(props) {
    super(props);
    this.state =
    {
      error: '',
      weatherList: []
    };
  }

  componentDidMount() {
    console.log("heerereere");
    if (this.props.city) {
      Meteor.call('getWeatherResults', this.props.city, (err, res) => {
        if (err) {
          console.log('getWeatherResults err: ', err);
        } else {
          console.log('getWeatherResults res: ', res);
          // save yelp data response to state
          this.setState({ weatherList: res });
        }
      });
    }
  }

  renderWeatherInfoItems() {
    if (this.state.weatherList) {
      // iterate through this.state.yelpList and render child component for each element
      return this.state.weatherList.map((weatherInfoList) => {
        return (
          <WeatherInfoList key={weatherInfoList.dt} weatherInfoList={weatherInfoList} />
        );
      });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="box">
          <h3 className="title is-2 has-text-grey-dark">Current Day Weather Information </h3>
        </div>
        {this.renderWeatherInfoItems()}
      </div>
    );
  }
}
