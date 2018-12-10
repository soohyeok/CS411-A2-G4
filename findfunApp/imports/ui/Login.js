import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link, browserHistory } from 'react-router';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const options = {
      requestPermissions: ['public_profile', 'email'],
      loginStyle: 'popup'
    };

    // trigger log in with facebook pop up
    // after log in user will be redirected to search page with onAuthChange in client/main.js
    Meteor.loginWithFacebook(options, (err) => {
      if (err) {
        console.log('Facebook login error', err);
        this.setState({error: err});
      } else {
        console.log('Facebook login success');
      }
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
                    <Link to="/signup" className="button is-medium">
                      <span>Sign Up</span>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="hero-body">
          <div className="container column column__center align-items-center">
            <form className="box has-text-centered custom-form" onSubmit={this.handleSubmit} noValidate>
              <div className="flex-column flex-column__center flex-align-items-center">
                <p className="title is-2 has-text-grey-dark">
                  <span>Find your fun</span>
                </p>
                <h1 className="subtitle is-4 has-text-grey-dark">Log In and bookmark your favorite events</h1>
              </div>
              <br />
              <div className="field">
                <div className="control">
                  <button className="button is-medium is-fullwidth is-link" type="submit">
                    <span className="icon">
                      <i className="fab fa-facebook"></i>
                    </span>
                    <span>
                      Log In with Facebook
                    </span>
                  </button>
                </div>
                {this.state.error ? <p class="help is-danger">{this.state.error}</p> : undefined}
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
