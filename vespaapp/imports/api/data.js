import { Mongo } from 'meteor/mongo';

export const Mars = new Mongo.Collection('mars');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('mars', function dataPublication({ mapBounds }) {
    if (mapBounds) {
      return Mars.find({
        location: { $geoWithin: { $box: mapBounds }}
      });
    }
    return Mars.find({});
  });
}
