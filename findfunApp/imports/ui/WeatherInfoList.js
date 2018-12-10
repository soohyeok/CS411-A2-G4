import React from 'react';

export default class WeatherInfoList extends React.Component {
  constructor(props) {
    super(props);

  }

  renderWeatherIcon()
  {
    if (this.props.weatherInfoList.weather[0].main == "Clouds") //cloudy weather
    {
      return (
        <span class="icon-large">
          <i class="fas fa-cloud fa-stack-2x"></i>
        </span>);
    }

    if (this.props.weatherInfoList.weather[0].main == "Clear") //clear sunny skies
    {
      return (
        <span class="icon-large">
          <i class="fas fa-sun fa-stack-2x"></i>
        </span>);
    }

    if (this.props.weatherInfoList.weather[0].main == "Snow") //snow icon
    {
      return (
        <span class="icon-large">
          <i class="fas fa-snowflake fa-stack-2x"></i>
        </span>);
    }

    if (this.props.weatherInfoList.weather[0].main == "Rain") //rain icon
    {
      return (
        <span class="icon-large">
          <i class="fas fa-umbrella fa-stack-2x"></i>
        </span>);
    }

  }

  render()
  {
    if (this.props.weatherInfoList)
    {

      const celsuis = this.props.weatherInfoList.main.temp - 273.15;
      const bigC = celsuis.toFixed(2); //only displays up to 2 decimal places
      // const weatherStatus = this.props.weatherInfoList.weather[0].main;
      // this.setState({ weatherStatus: weatherStatus });
      //concatenate degree celcius string to the weather output display

      return (

        <div className="card searchResult">
          <div className="card-image">
              {this.renderWeatherIcon()}
          </div>
          <div className="card-content">
            <div className="column column__space-between">
            {bigC + '°C'}
        </div>
        </div>
    </div>);

      }
    }
  }


/*
        <div className="card searchResult">
          <div className="card-image">
            <figure className="image is-2by2">
                  {this.renderWeatherIcon()}
            </figure>
          </div>

        <div className="card-content">
            <div className="column is-one-quarter">
              <h3 className="title is-3 has-text-grey-dark">{bigC + '°C'}</h3>
            <div>
        </div>
      </div>
    </div>
  </div>);

    }
  }
}*/

        //<div>
      //<div>
          //{bigC + '°C'}
      //</div>
      //<div>
          //  {this.renderWeatherIcon()}
      //</div>
    //</div>);

    //}

  //}
//}
