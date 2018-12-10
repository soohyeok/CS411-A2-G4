import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link, browserHistory } from 'react-router';

export default class YelpListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      bookmarkSaved: false
    };

    this.bookmarksInsert = this.bookmarksInsert.bind(this);
  }

  bookmarksInsert() {
    if (this.props.yelpListItem && this.props.city && this.props.time) {
      if (Meteor.userId()) {
        Meteor.call(
          'bookmarksInsert',
          this.props.city,
          this.props.time,
          'food',
          'yelp',
          this.props.yelpListItem.id,
          this.props.yelpListItem.name,
          this.props.yelpListItem.categories[0].title,
          this.props.yelpListItem.url,
          this.props.yelpListItem.image_url,
          (err, res) => {
            if (err) {
              console.log('bookmarksInsert error: ', err);
              this.setState({error: err, bookmarkSaved: false});
            } else {
              console.log('bookmarksInsert success');
              this.setState({error: '', bookmarkSaved: true});
            }
          }
        );
      } else {
        browserHistory.push('/signup');
      }
    }
  }

  render() {
    if (this.props.yelpListItem) {
      // reference props to dislpay the desired information about business
      // (have a look at console output to see what data exists)
      // console.log('yelpListItem: ', this.props.yelpListItem);
      return (
        <div className="card searchResult">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={this.props.yelpListItem.image_url} alt="Restaurant image" />
            </figure>
          </div>
          <div className="card-content">
            <div className="row row__space-between">
              <h3 className="title is-3 has-text-grey-dark">{this.props.yelpListItem.name}</h3>
              <a className={this.state.bookmarkSaved ? 'button is-success' : 'button'} onClick={this.bookmarksInsert}>
                <span className="icon">
                  <i className="fas fa-bookmark"></i>
                </span>
                <span>{this.state.bookmarkSaved ? 'Bookmarked' : 'Bookmark it!'}</span>
              </a>
            </div>
            <h5 className="subtitle is-5 has-text-grey-dark">{this.props.yelpListItem.categories[0].title}</h5>
            <a href={this.props.yelpListItem.url} target="_blank">
              Learn more
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
