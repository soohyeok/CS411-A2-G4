import { Meteor } from 'meteor/meteor';
import React from 'react';

import YelpListItem from './YelpListItem.js';

export default class YelpList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      yelpList: []
    };
  }

  componentDidMount() {
    if (this.props.city && this.props.time) {
      Meteor.call('getYelpResults', this.props.city, this.props.time, (err, res) => {
        if (err) {
          console.log('getYelpResults err: ', err);
        } else {
          console.log('getYelpResults res: ', res);
          // save yelp data response to state
          this.setState({ yelpList: res });
        }
      });
    }
  }

  renderYelpListItems() {
    if (this.state.yelpList) {
      // iterate through this.state.yelpList and render child component for each element
      return this.state.yelpList.map((yelpListItem) => {
        return (
          <YelpListItem key={yelpListItem.id} yelpListItem={yelpListItem} city={this.props.city} time={this.props.time} />
        );
      });
    }
  }

  render() {
    return (
      <div className="column">
        <div className="box">
          <h3 className="title is-3 has-text-grey-dark">Food</h3>
        </div>
        {this.renderYelpListItems()}
      </div>
    );
  }
}
