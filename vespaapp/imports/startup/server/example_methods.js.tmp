import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Registry } from '../../api/collections/registry.js';

Meteor.methods({
  'registry.read'(schema) {
    console.log("Reading schema: "+schema);
    if (schema) {
      check(schema, String);
      return Registry.findOne({"schema": schema});
    }
    return undefined;
  }
})
