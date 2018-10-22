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

  onSubmit(e) {
    e.preventDefault();

    // get value of input field
    let search = this.refs.search.value.trim();

    // make sure input is not empty
    if (search.length === 0) {
      return this.setState({error: 'Please enter your search.'});
    }

    // call server method to get Yelp data
    Meteor.call('getYelpData', search, (err, res) => {
      if (err) {
        console.log('getYelpData err: ', err);
      } else {
        console.log('getYelpData res: ', res);
        // save yelp data response to state
        this.setState({ yelpList: res });
      }
    });
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
        <h3>Enter a search term below: </h3>
        {this.state.error ? <p className="">{this.state.error}</p> : undefined}
        <form onSubmit={this.onSubmit.bind(this)} noValidate className="">
          <input ref="search" name="search" placeholder="Search..."/>
          <button className="" type="submit">Search</button>
        </form>
        {this.renderYelpListItems()}
      </div>
    );
  }
}
