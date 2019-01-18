import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const DataNG = new Mongo.Collection('bdip');

if (Meteor.isServer) {
  // Meteor.publish('no_geometry', function dataPublication({ body }) {
  //     return DataNG.find({ target: "/^"+body+"$/i" });
  // });
  Meteor.publish('bdip', function dataPublication({ body }) {
      return DataNG.find({target_name: { $regex: new RegExp(body,"i") },
                          access_format : "image/jpeg"});
  });
}
