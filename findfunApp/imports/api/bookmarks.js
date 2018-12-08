import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

export const Bookmarks = new Mongo.Collection('bookmarks');

if (Meteor.isServer) {
  Meteor.publish('bookmarks', function () {
    if (this.userId) {
       return Bookmarks.find({userId: this.userId}, {fields: {}});
    } else {
      this.ready();
    }
  });
}

Meteor.methods({
  // what data do we need/want
  bookmarksInsert(city, time, category, api_source, event_id, event_name, event_genre, event_url, event_image_url) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

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

    if (Meteor.isServer) {
      const timestamp = moment().format();

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
    }
  },
  bookmarksRemove(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {
        type: String
      }
    }).validate({ _id });

    Bookmarks.remove({ _id, userId: this.userId });
  }
});
