import React from 'react';
import { Link, browserHistory } from 'react-router';

import Navbar from './Navbar.js';
import ActivityList from './ActivityList.js';
import YelpList from './YelpList.js';
import TicketmasterList from './TicketmasterList.js';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  renderSearchResults() {
    const city = this.props.params.city;
    const time = this.props.params.time;

    if (time === 'day') {
      console.log('search results: day');
      return (
        <div className="columns">
          <ActivityList city={city} time={time} />
          <YelpList city={city} time={time} />
        </div>
      );
    } else if (time === 'night') {
      console.log('search results: night');
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
            {/* <WeatherList city={this.props.params.city} /> */}
            <div className="box">
              <h2 className="title is-2 has-text-grey-dark">Find your fun</h2>
              <h4 className="subtitle is-4 has-text-grey-dark">Browse our recommended activites and bookmark your favorites to have a {this.props.params.time} of fun</h4>
            </div>
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
