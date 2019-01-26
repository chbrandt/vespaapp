import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const DataAny = new Mongo.Collection('data_any');

if (Meteor.isServer) {

  Meteor.publish('data_any', function ({ target }) {
      return DataAny.find({ target_name: { $regex: new RegExp(target,"i") }});
  });

}
