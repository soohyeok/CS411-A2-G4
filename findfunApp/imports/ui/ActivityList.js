import { Meteor } from 'meteor/meteor';
import React from 'react';

import ActivityListItem from './ActivityListItem.js';

export default class ActivityList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      activityList: []
    };
  }

  componentDidMount() {
    if (this.props.city && this.props.time) {
      Meteor.call('getDayActivities', this.props.city, this.props.time, (err, res) => {
        if (err) {
          console.log('getDayActivities err: ', err);
        } else {
          console.log('getDayActivities res: ', res);
          // save yelp data response to state
          this.setState({ activityList: res });
        }
      });
    }
  }

  renderActivityListItems() {
    if (this.state.activityList) {
      // iterate through this.state.yelpList and render child component for each element
      return this.state.activityList.map((activityListItem) => {
        return (
          <ActivityListItem key={activityListItem.id} activityListItem={activityListItem} />
        );
      });
    }
  }

  render() {
    return (
      <div className="column">
        <div className="box">
          <h3 className="title is-3 has-text-grey-dark">Activities</h3>
        </div>
        {this.renderActivityListItems()}
      </div>
    );
  }
}
