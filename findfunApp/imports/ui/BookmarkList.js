import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import React from 'react';

import BookmarkListItem from './BookmarkListItem.js';

import { Bookmarks } from '../api/bookmarks.js';

export default class BookmarkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      activities: [],
      entertainment: [],
      food: [],
      error: ''
    };
  }

  componentDidMount() {
    // subscribe to user's bookmarks and save to state to be rendered
    this.bookmarklistTracker = Tracker.autorun(() => {
      Meteor.subscribe('bookmarks');
      const bookmarks = Bookmarks.find({userId: Meteor.userId()}).fetch();
      console.log('bookmarks: ', bookmarks);
      this.setState({
        bookmarks,
        activities: bookmarks.filter(bookmark => bookmark.category === 'activities'),
        entertainment: bookmarks.filter(bookmark => bookmark.category === 'entertainment'),
        food: bookmarks.filter(bookmark => bookmark.category === 'food')
      });
    });
  }

  componentWillUnmount() {
    // stop tracker
    this.bookmarklistTracker.stop();
  }

  // iterate through activities and render each in child component
  renderActivities() {
    if (this.state.bookmarks) {
      if (this.state.activities) {
        return this.state.activities.map((bookmark) => {
          return <BookmarkListItem key={bookmark._id} bookmarkListItem={bookmark} />
        });
      }
    }
  }

  // iterate through entertainment and render each in child component
  renderEntertainment() {
    if (this.state.bookmarks) {
      if (this.state.entertainment) {
        return this.state.entertainment.map((bookmark) => {
          return <BookmarkListItem key={bookmark._id} bookmarkListItem={bookmark} />
        });
      }
    }
  }

  // iterate through food and render each in child component
  renderFood() {
    if (this.state.bookmarks) {
      if (this.state.food) {
        return this.state.food.map((bookmark) => {
          return <BookmarkListItem key={bookmark._id} bookmarkListItem={bookmark} />
        });
      }
    }
  }

  render() {
    return (
      <div className="columns">
        <div className="column">
          <div className="box">
            <h3 className="title is-3 has-text-grey-dark">Food</h3>
          </div>
          {this.renderFood()}
        </div>
        <div className="column">
          <div className="box">
            <h3 className="title is-3 has-text-grey-dark">Activities</h3>
          </div>
          {this.renderActivities()}
        </div>
        <div className="column">
          <div className="box">
            <h3 className="title is-3 has-text-grey-dark">Shows</h3>
          </div>
          {this.renderEntertainment()}
        </div>
      </div>
    );
  }
}
