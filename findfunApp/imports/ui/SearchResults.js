import React from 'react';
import { Link, browserHistory } from 'react-router';

import YelpList from './YelpList.js';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
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
            <YelpList longitude={this.props.params.longitude} latitude={this.props.params.latitude} search={this.props.params.search} />
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
