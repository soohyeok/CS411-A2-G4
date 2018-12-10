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
    this.bookmarklistTracker = Tracker.autorun(() => {
      Meteor.subscribe('bookmarks');
      const bookmarks = Bookmarks.find({userId: Meteor.userId()}).fetch();
      console.log('bookmarks: ', bookmarks);
      // const food = bookmarks.filter(bookmark => bookmark.category === 'food');
      // console.log()
      this.setState({
        bookmarks,
        activities: bookmarks.filter(bookmark => bookmark.category === 'activities'),
        entertainment: bookmarks.filter(bookmark => bookmark.category === 'entertainment'),
        food: bookmarks.filter(bookmark => bookmark.category === 'food')
      });
    });
  }

  componentWillUnmount() {
    this.bookmarklistTracker.stop();
  }

  renderActivities() {
    if (this.state.bookmarks) {
      if (this.state.activities) {
        return this.state.activities.map((bookmark) => {
          return <BookmarkListItem key={bookmark._id} bookmarkListItem={bookmark} />
        });
      }
    }
  }

  renderEntertainment() {
    if (this.state.bookmarks) {
      if (this.state.entertainment) {
        return this.state.entertainment.map((bookmark) => {
          return <BookmarkListItem key={bookmark._id} bookmarkListItem={bookmark} />
        });
      }
    }
  }

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
