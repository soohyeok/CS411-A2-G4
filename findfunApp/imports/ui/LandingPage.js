import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link, browserHistory } from 'react-router';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      time: 'day'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();

    // get value of input field
    const search = this.state.search.trim();

    // make sure input is not empty
    if (search.length === 0) {
      return this.setState({error: 'Please enter your search.'});
    }

    // go to new url with search parameters in url (push to history stack so that back button works)
    browserHistory.push(`/s/-122.399972/37.786882/${search}`);
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
                <span className="navbar-burger burger" data-target="navbarMenuHero">
                  <span></span>
                  <span></span>
                </span>
              </div>
              <div id="navbarMenuHero" className="navbar-menu">
                <div className="navbar-end">
                  <span className="navbar-item">
                    <a className="button is-success is-medium">
                      <span>Sign Up</span>
                    </a>
                  </span>
                  <span className="navbar-item">
                    <a className="button is-medium">
                      <span>Log In</span>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </div>
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
                    <input className="input is-large" name="search" type="text" value={this.state.search} onChange={this.handleChange} />
                    <span className="icon is-small is-left">
                      <i className="fas fa-search"></i>
                    </span>
                  </p>
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
