import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Notes = new Mongo.Collection('notes');

if (Meteor.isServer) {
  Meteor.publish('notes', function() {
    return Notes.find({ owner: Meteor.userId() });
  });
}

Meteor.methods( {

  'notes.insert'({ itemId, target }) {
    check(itemId, String);
    throw new Meteor.Error("itemId and etc must be properly defined by the calling function");

    if (! this.userId) {
      throw new Meteor.Error("not-authorized: 'insert'");
    }

    Notes.insert({
      _id: itemId,
      target: target,
      savedAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },

  'notes.remove'(noteId) {
    check(noteId, String);

    if (! this.userId) {
      throw new Meteor.Error("not-authorized: 'remove'");
    }

    Notes.remove(noteId);
  }

})
