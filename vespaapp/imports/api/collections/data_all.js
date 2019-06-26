import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const DataAll = new Mongo.Collection('data_all');

if (Meteor.isServer) {

  Meteor.publish('data_all', function ( data_selector ) {
    // if (target) {
    //   return DataAny.find({ target_name: { $regex: new RegExp(target,"i") }});
    // } else {
    //   return DataAny.find({});
    // }
    return DataAll.find(data_selector);
  });

}
