import React from 'react';

export default class ActivityListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.activityListItem) {
      // reference props to dislpay the desired information about business
      // (have a look at console output to see what data exists)
      console.log('activityListItem: ', this.props.activityListItem);
      return (
        <div className="card searchResult">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={this.props.activityListItem.image_url} alt="Activity image" />
            </figure>
          </div>
          <div className="card-content">
            <div className="row row__space-between">
              <h3 className="title is-3 has-text-grey-dark">{this.props.activityListItem.name}</h3>
              <a className="button">
                <span className="icon">
                  <i className="fas fa-bookmark"></i>
                </span>
                <span>Bookmark it!</span>
              </a>
            </div>
            <h5 className="subtitle is-5 has-text-grey-dark">{this.props.activityListItem.categories[0].title}</h5>
            <a href={this.props.activityListItem.url} target="_blank">
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
