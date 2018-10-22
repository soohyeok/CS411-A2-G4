import React from 'react';

export default class YelpListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.yelpListItem) {
      // reference props to dislpay the desired information about business
      // (have a look at console output to see what data exists)
      console.log('yelpListItem: ', this.props.yelpListItem);
      return (
        <div className="YelpListItem">
          <h3>{this.props.yelpListItem.name}</h3>
          <p>{this.props.yelpListItem.is_closed ? 'Closed' : 'Open'}</p>
          <p>{this.props.yelpListItem.price}</p>
          <p>Rating: {this.props.yelpListItem.rating}/5</p>
          <p>{this.props.yelpListItem.display_phone}</p>
          <p>{this.props.yelpListItem.location.address1}, {this.props.yelpListItem.location.city}</p>
          <img className="yelpListItem-image" src={this.props.yelpListItem.image_url} />
        </div>
      );
    }
    return null;
  }
}
