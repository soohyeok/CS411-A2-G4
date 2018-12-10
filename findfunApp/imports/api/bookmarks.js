import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

export const Bookmarks = new Mongo.Collection('bookmarks');

if (Meteor.isServer) {
  // publish saved bookmarks for logged in user using unique userId
  Meteor.publish('bookmarks', function () {
    if (this.userId) {
       return Bookmarks.find({userId: this.userId}, {fields: {}});
    } else {
      this.ready();
    }
  });
}

Meteor.methods({
  // insert new bookmark into db using logged in user unique userId
  bookmarksInsert(city, time, category, api_source, event_id, event_name, event_genre, event_url, event_image_url) {
    // throw error if user is not logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // clean input from client
    new SimpleSchema({
      city: {
        type: String
      },
      time: {
        type: String
      },
      category: {
        type: String
      },
      api_source: {
        type: String
      },
      event_id: {
        type: String
      },
      event_name: {
        type: String
      },
      event_genre: {
        type: String
      },
      event_url: {
        type: String
      },
      event_image_url: {
        type: String
      }
    }).validate({
      city,
      time,
      category,
      api_source,
      event_id,
      event_name,
      event_genre,
      event_url,
      event_image_url
    });

    const timestamp = moment().format();

    // insert new document into Bookmarks collection
    Bookmarks.insert({
      userId: this.userId,
      created: timestamp,
      city,
      time,
      category,
      api_source,
      event_id,
      event_name,
      event_genre,
      event_url,
      event_image_url
    });
  },
  // delete bookmark using bookmark's unique _id
  bookmarksRemove(_id) {
    // throw error if user is not logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // clean input from client
    new SimpleSchema({
      _id: {
        type: String
      }
    }).validate({ _id });

    // remove document
    Bookmarks.remove({ _id, userId: this.userId });
  }
});
