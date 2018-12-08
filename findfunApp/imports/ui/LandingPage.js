import React from 'react';
import { Link, browserHistory } from 'react-router';

import Navbar from './Navbar.js';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      city: '',
      time: 'day'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();

    // get value of input field
    const city = this.state.city.trim();

    // make sure input is not empty
    if (city.length === 0) {
      return this.setState({error: 'Please enter a city.'});
    }

    // go to new url with city parameters in url (push to history stack so that back button works)
    browserHistory.push(`/s/${city}/${this.state.time}`);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <section className="hero is-info is-fullheight">
        <Navbar />
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-size-1">
              Find your day<span className="has-text-link">/</span><span className="has-text-grey-darker">night</span> of fun
            </h1>
            <form onSubmit={this.handleSubmit} noValidate className="field is-horizontal column column-center align-items-center">
              <div className="field-body">
                <div className="field is-narrow">
                  <div className="control has-icons-left">
                    <div className="select is-large is-fullwidth">
                      <select name="time" value={this.state.time} onChange={this.handleChange}>
                        <option value="day">Day</option>
                        <option value="night">Night</option>
                      </select>
                    </div>
                    <span className="icon is-small is-left">
                      {this.state.time === 'day' ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
                    </span>
                  </div>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input className="input is-large" placeholder="Boston" name="city" type="text" value={this.state.city} onChange={this.handleChange} />
                    <span className="icon is-small is-left">
                      <i className="fas fa-location-arrow"></i>
                    </span>
                  </p>
                  {this.state.error ? <p className="help is-danger">{this.state.error}</p> : undefined}
                </div>
                <div className="field">
                  <div className="control">
                    <button className="button is-large is-danger" type="submit">Let's go</button>
                  </div>
                </div>
              </div>
            </form>
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
