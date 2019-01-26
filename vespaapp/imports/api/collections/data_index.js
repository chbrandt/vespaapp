import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const DataIndex = new Mongo.Collection('data_index');

if (Meteor.isServer) {

  console.log('Publishing: data_index');
  Meteor.publish('data_index', () => {
    return DataIndex.find();
  });

}
