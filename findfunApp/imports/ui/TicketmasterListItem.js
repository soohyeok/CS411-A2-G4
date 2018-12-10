import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link, browserHistory } from 'react-router';

export default class TicketmasterListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      bookmarkSaved: false
    };
    this.imageIndex = 0;
    this.bookmarksInsert = this.bookmarksInsert.bind(this);
  }

  bookmarksInsert() {
    if (this.props.ticketmasterListItem && this.props.city && this.props.time) {
      if (Meteor.userId()) {
        Meteor.call(
          'bookmarksInsert',
          this.props.city,
          this.props.time,
          'entertainment',
          'ticketmaster',
          this.props.ticketmasterListItem.id,
          this.props.ticketmasterListItem.name,
          this.props.ticketmasterListItem.classifications[0].genre.name,
          this.props.ticketmasterListItem._embedded.venues[0].url,
          this.props.ticketmasterListItem.images[this.imageIndex].url,
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

  renderConcertImage() {
    if (this.props.ticketmasterListItem) {
      let counter = 0;
      this.props.ticketmasterListItem.images.map((image) => {
        if (image.ratio === '4_3') {
          this.imageIndex = counter;
        }
        counter += 1;
      });
      // console.log('ticketmasterListItem imageIndex: ', this.imageIndex);
      return (
        <figure className="image is-4by3">
          <img src={this.props.ticketmasterListItem.images[this.imageIndex].url} alt="Concert image" />
        </figure>
      );
    }
  }

  render() {
    if (this.props.ticketmasterListItem) {
      // reference props to dislpay the desired information about business
      // (have a look at console output to see what data exists)
      // console.log('ticketmasterListItem: ', this.props.ticketmasterListItem);
      return (
        <div className="card searchResult">
          <div className="card-image">
            {this.renderConcertImage()}
          </div>
          <div className="card-content">
            <div className="row row__space-between">
              <h3 className="title is-3 has-text-grey-dark">{this.props.ticketmasterListItem.name}</h3>
              <a className={this.state.bookmarkSaved ? 'button is-success' : 'button'} onClick={this.bookmarksInsert}>
                <span className="icon">
                  <i className="fas fa-bookmark"></i>
                </span>
                <span>{this.state.bookmarkSaved ? 'Bookmarked' : 'Bookmark it!'}</span>
              </a>
            </div>
            <h5 className="subtitle is-5 has-text-grey-dark">{this.props.ticketmasterListItem.classifications[0].genre.name}</h5>
            <a href={this.props.ticketmasterListItem._embedded.venues[0].url} target="_blank">
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
