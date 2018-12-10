import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Link, browserHistory } from 'react-router';

export default class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: ''
    }
  }

  componentDidMount() {
    // keep track of user's authentication status in navbar to show the correct navigation buttons
    this.isAuthenticatedTracker = Tracker.autorun(() => {
      const isAuthenticated = !!Meteor.userId();
      this.setState({ isAuthenticated });
    });
  }

  componentWillUnmount() {
    // stop tracker
    this.isAuthenticatedTracker.stop();
  }

  // render the appropriate navigation buttons based on authentication state 
  renderAccountButtons() {
    if (this.state.isAuthenticated) {
      return (
        <div className="navbar-end">
          <span className="navbar-item">
            <Link to="/profile" className="button is-medium">
              <span className="icon">
                <i className="fas fa-bookmark"></i>
              </span>
              <span>My Bookmarks</span>
            </Link>
          </span>
          <span className="navbar-item">
            <a className="button is-medium" onClick={() => {
              Meteor.logout((err) => {
                if (err) {
                  console.log('logout err: ', err);
                } else {
                  console.log('logout success');
                  this.setState({isAuthenticated: false});
                }
              });
            }}>
              <span>Log Out</span>
            </a>
          </span>
        </div>
      );
    } else {
      return (
        <div className="navbar-end">
          <span className="navbar-item">
            <Link to="/signup" className="button is-success is-medium">
              <span>Sign Up</span>
            </Link>
          </span>
          <span className="navbar-item">
            <Link to="/login" className="button is-medium">
              <span>Log In</span>
            </Link>
          </span>
        </div>
      );
    }
  }

  render() {
    return (
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
              {this.renderAccountButtons()}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
