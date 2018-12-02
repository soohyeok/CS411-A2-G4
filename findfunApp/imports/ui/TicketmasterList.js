import { Meteor } from 'meteor/meteor';
import React from 'react';

import TicketmasterListItem from './TicketmasterListItem.js';

export default class TicketmasterList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      ticketmasterList: []
    };
  }

  componentDidMount() {
    if (this.props.city && this.props.time) {
      Meteor.call('getTicketmasterResults', this.props.city, this.props.time, (err, res) => {
        if (err) {
          console.log('getTicketmasterResults err: ', err);
        } else {
          console.log('getTicketmasterResults res: ', res);
          // save ticketmaster data response to state
          this.setState({ ticketmasterList: res });
        }
      });
    }
  }

  renderTicketmasterListItems() {
    if (this.state.ticketmasterList) {
      // iterate through this.state.ticketmasterList and render child component for each element
      return this.state.ticketmasterList.map((ticketmasterListItem) => {
        return (
          <TicketmasterListItem key={ticketmasterListItem.id} ticketmasterListItem={ticketmasterListItem} />
        );
      });
    }
  }

  render() {
    return (
      <div className="column">
        <div className="box">
          <h3 className="title is-3 has-text-grey-dark">Entertainment</h3>
        </div>
        {this.renderTicketmasterListItems()}
      </div>
    );
  }
}
