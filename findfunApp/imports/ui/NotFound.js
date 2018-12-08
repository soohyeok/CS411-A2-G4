import React from 'react';
import { Link } from 'react-router';

export default class NotFound extends React.Component {
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
          <div className="container has-text-centered">
            <h1 className="title is-size-1">
              Oops, you're in the wrong place
            </h1>
            <div className="column column-center align-items-center">
              <Link to="/" className="button is-danger is-large">Go home</Link>
            </div>
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
