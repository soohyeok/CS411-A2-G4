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
      error: ''
    };
  }

  componentDidMount() {
    this.bookmarklistTracker = Tracker.autorun(() => {
      Meteor.subscribe('bookmarks');
      const bookmarks = Bookmarks.find({userId: Meteor.userId()}).fetch();
      console.log('bookmarks: ', bookmarks);
      this.setState({bookmarks});
    });
  }

  renderBookmarks() {
    if (this.state.bookmarks) {
      return this.state.bookmarks.map((bookmark) => {
        return <BookmarkListItem key={bookmark._id} bookmarkListItem={bookmark} />
      });
    }
  }

  render() {
    return (
      <div>
        {this.renderBookmarks()}
      </div>
    );
  }
}
