import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link, browserHistory } from 'react-router';

import YelpList from './YelpList.js';

export default class LandingPage extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div className="row row__space-between">
          <Link to="/"><p className="tetatet-logo">Find Fun</p></Link>
          <div className="row">
          </div>
        </div>
        <div className="">
          <h1>Welcome to Find Fun!</h1>
          <YelpList />
        </div>
      </div>
    );
  }
}
