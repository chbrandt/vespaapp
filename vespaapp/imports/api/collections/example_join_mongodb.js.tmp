import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Registry = new Mongo.Collection('registry');

if (Meteor.isServer) {

  Meteor.publish('registry', function() {
    return Registry.aggregate([
      {
        $lookup : {
          from: "registry",
          foreignField: "schema",
          localField: "schema_epn_core",
          as: "services"
        }
      },
      {
        $replaceRoot : {
          newRoot: {
            $mergeObjects: [
              "$$ROOT",
              {
                service_ivo_id: {
                  $arrayElemAt: ["$services.identifier", 0]
                }
              }
            ]
          }
        }
      },
      {
        $project: {
          services: 0
        }
      }
    ]);
  });
}
