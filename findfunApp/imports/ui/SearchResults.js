import React from 'react';
import { Link, browserHistory } from 'react-router';

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
        <div className="hero-head">
          <nav className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <Link to="/" className="navbar-item is-size-3">
                  <span className="icon is-medium">
                    <i className="fas fa-map-pin"></i>
                  </span>
                  <span>Funtimes</span>
                </Link>
              </div>
              <div className="navbar-menu">
                <div className="navbar-end">
                </div>
              </div>
            </div>
          </nav>
        </div>
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
              <ul>
                <li><a>About</a></li>
                <li><a>Contact</a></li>
                <li><a>Privacy Policy</a></li>
                <li><a>Terms of Use</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </section>
    );
  }
}
