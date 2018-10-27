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
    if (this.props.search) {
      Meteor.call('getYelpData', this.props.longitude, this.props.latitude, this.props.search, (err, res) => {
        if (err) {
          console.log('getYelpData err: ', err);
        } else {
          // console.log('getYelpData res: ', res);
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
          <YelpListItem key={yelpListItem.id} yelpListItem={yelpListItem} />
        );
      });
    }
  }

  render() {
    return (
      <div>
        {this.renderYelpListItems()}
      </div>
    );
  }
}
