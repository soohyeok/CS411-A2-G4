import React from 'react';

export default class TicketmasterListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  renderConcertImage() {
    if (this.props.ticketmasterListItem) {
      let imageIndex = 0;
      let counter = 0;
      this.props.ticketmasterListItem.images.map((image) => {
        if (image.ratio === '4_3') {
          imageIndex = counter;
        }
        counter += 1;
      });
      // console.log('ticketmasterListItem imageIndex: ', imageIndex);
      return (
        <figure className="image is-4by3">
          <img src={this.props.ticketmasterListItem.images[imageIndex].url} alt="Concert image" />
        </figure>
      );
    }
  }

  render() {
    if (this.props.ticketmasterListItem) {
      // reference props to dislpay the desired information about business
      // (have a look at console output to see what data exists)
      console.log('ticketmasterListItem: ', this.props.ticketmasterListItem);
      return (
        <div className="card searchResult">
          <div className="card-image">
            {this.renderConcertImage()}
          </div>
          <div className="card-content">
            <div className="row row__space-between">
              <h3 className="title is-3 has-text-grey-dark">{this.props.ticketmasterListItem.name}</h3>
              <a className="button">
                <span className="icon">
                  <i className="fas fa-bookmark"></i>
                </span>
                <span>Bookmark it!</span>
              </a>
            </div>
            <h5 className="subtitle is-5 has-text-grey-dark">{this.props.ticketmasterListItem.classifications[0].genre.name}</h5>
            <a href={this.props.ticketmasterListItem.url} target="_blank">
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
