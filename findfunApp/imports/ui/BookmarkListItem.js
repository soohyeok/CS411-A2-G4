import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class BookmarkListItem extends React.Component {
  constructor(props) {
    super(props);

    this.bookmarksRemove = this.bookmarksRemove.bind(this);
  }

  // delete bookmark from db for user
  bookmarksRemove() {
    Meteor.call('bookmarksRemove', this.props.bookmarkListItem._id, (err, res) => {
      if (err) {
        console.log('bookmarksRemove error: ', err);
      } else {
        console.log('bookmarksRemove success');
      }
    });
  }

  render() {
    if (this.props.bookmarkListItem) {
      // console.log('bookmarkListItem: ', this.props.bookmarkListItem);
      return (
        <div className="card searchResult">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={this.props.bookmarkListItem.event_image_url} alt="Activity image" />
            </figure>
          </div>
          <div className="card-content">
            <div className="row row__space-between">
              <h3 className="title is-3 has-text-grey-dark">{this.props.bookmarkListItem.event_name}</h3>
              <a className="button" onClick={this.bookmarksRemove}>
                <span className="icon">
                  <i className="fas fa-trash"></i>
                </span>
                <span>Delete</span>
              </a>
            </div>
            <h5 className="subtitle is-5 has-text-grey-dark">{this.props.bookmarkListItem.event_genre}</h5>
            <a href={this.props.bookmarkListItem.event_url} target="_blank">
              Get details
              <span className="icon is-link">
                <i className="fas fa-external-link-alt"></i>
              </span>
            </a>
          </div>
        </div>
      );
    }
    return null;
  }
}
