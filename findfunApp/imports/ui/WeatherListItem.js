import React from 'react';
import moment from 'moment';

export default class WeatherListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  // convert the temperature from kelvin to fahrenheit and render the correct image based on the weather description
  renderWeatherDetails() {
    const celsius = this.props.weatherListItem.main.temp - 273.15;
    const fahrenheit = (celsius * 1.8) + 32;
    const cleanedFarhenheit = fahrenheit.toFixed(0) + '°F';
    if (this.props.weatherListItem.weather[0].main == 'Clouds') {
      return (
        <h5 className="title is-5 has-text-grey-dark">
          <span className="icon is-medium">
            <i className="fas fa-cloud"></i>
          </span>
          <span>
            {cleanedFarhenheit}
          </span>
        </h5>

      );
    } else if (this.props.weatherListItem.weather[0].main == 'Clear') {
      return (
        <h5 className="title is-5 has-text-grey-dark">
          <span className="icon is-medium">
            <i className="fas fa-sun"></i>
          </span>
          <span>
            {cleanedFarhenheit}
          </span>
        </h5>
      );
    } else if (this.props.weatherListItem.weather[0].main == 'Snow') {
      return (
        <h5 className="title is-5 has-text-grey-dark">
          <span className="icon is-medium">
            <i className="fas fa-snowflake"></i>
          </span>
          <span>
            {cleanedFarhenheit}
          </span>
        </h5>
      );
    } else if (this.props.weatherListItem.weather[0].main == 'Rain') {
      return (
        <h5 className="title is-5 has-text-grey-dark">
          <span className="icon is-medium">
            <i className="fas fa-umbrella"></i>
          </span>
          <span>
            {cleanedFarhenheit}
          </span>
        </h5>
      );
    }
  }

  render() {
    if (this.props.weatherListItem) {
      // console.log('weatherListItem: ', this.props.weatherListItem);
      return (
        <div className="column">
          <div className="box has-text-centered">
            <h4 className="title is-4 has-text-grey-dark">{moment(this.props.weatherListItem.dt_txt).format('dddd Do')}</h4>
            {this.renderWeatherDetails()}
          </div>
        </div>
      );

    }
  }
}
