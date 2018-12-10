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
      // get activities from server method (which calls Yelp API)
      Meteor.call('getDayActivities', this.props.city, this.props.time, (err, res) => {
        if (err) {
          console.log('getDayActivities err: ', err);
        } else {
          console.log('getDayActivities res: ', res);
          // save response to state
          this.setState({ activityList: res });
        }
      });
    }
  }

  // iterate through array of objects and render child component for each element
  renderActivityListItems() {
    if (this.state.activityList) {
      return this.state.activityList.map((activityListItem) => {
        return (
          <ActivityListItem key={activityListItem.id} activityListItem={activityListItem} city={this.props.city} time={this.props.time} />
        );
      });
    }
  }

  render() {
    return (
      <div className="column">
        <div className="box">
          <h3 className="title is-3 has-text-grey-dark">Activities</h3>
          <h5 className="title is-5 has-text-grey-dark">Bookmark a fun activity for you and your friends</h5>
        </div>
        {this.renderActivityListItems()}
      </div>
    );
  }
}
