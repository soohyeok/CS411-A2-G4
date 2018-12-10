import { Meteor } from 'meteor/meteor';
import React from 'react';

import Navbar from './Navbar.js';
import BookmarkList from './BookmarkList.js';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      picture_url: ''
    }
  }
  componentDidMount() {
    Meteor.call('getUserProfileData', (err, res) => {
      if (err) {
        console.log('getUserData error: ', err);
      } else {
        // console.log('getUserData success', res);
        this.setState({name: res.name, picture_url: res.picture_url});
      }
    })
  }

  renderProfileCard() {
    if (this.state.name && this.state.picture_url) {
      return (
        <div className="box">
          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img src={this.state.picture_url} />
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <h2 className="title is-2 has-text-grey-dark">{this.state.name}</h2>
                <h4 className="subtitle is-4 has-text-grey-dark">Browse your bookmarks and make plans for a fun time</h4>
              </div>
            </div>
          </article>
        </div>
      );
    }
  }

  render() {
    return (
      <section className="hero is-info is-fullheight">
        <Navbar />
        <div className="hero-body">
          <div className="container">
            {this.renderProfileCard()}
            <BookmarkList />
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
