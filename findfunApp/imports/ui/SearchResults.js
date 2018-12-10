import React from 'react';
import { Link, browserHistory } from 'react-router';

import Navbar from './Navbar.js';
import ActivityList from './ActivityList.js';
import YelpList from './YelpList.js';
import TicketmasterList from './TicketmasterList.js';
import WeatherList from './WeatherList.js';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  // render the appropriate data based on user's selection of 'day' or 'night'
  renderSearchResults() {
    const city = this.props.params.city;
    const time = this.props.params.time;
    console.log('search results: ', city, time);
    if (time === 'day') {
      return (
        <div className="columns">
          <ActivityList city={city} time={time} />
          <YelpList city={city} time={time} />
        </div>
      );
    } else if (time === 'night') {
      return (
        <div className="columns">
          <TicketmasterList city={city} time={time} />
          <YelpList city={city} time={time} />
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <section className="hero is-info is-fullheight">
        <Navbar />
        <div className="hero-body">
          <div className="container">
            <WeatherList city={this.props.params.city} />
            {this.renderSearchResults()}
          </div>
        </div>
        <div className="hero-foot">
          <nav className="tabs">
            <div className="container">
            </div>
          </nav>
        </div>
      </section>
    );
  }
}
