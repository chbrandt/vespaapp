import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const DataAny = new Mongo.Collection('data_any');

if (Meteor.isServer) {

  Meteor.publish('data_any', function ( data_selector ) {
    // if (target) {
    //   return DataAny.find({ target_name: { $regex: new RegExp(target,"i") }});
    // } else {
    //   return DataAny.find({});
    // }
    return DataAny.find(data_selector);
  });

}
