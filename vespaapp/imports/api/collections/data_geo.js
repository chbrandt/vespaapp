import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

/*

In a file "settings.json" we define the name for our 'Data' collection.
We may then easily change between production/development/test datasets.
Documentation about settings and environment at:
* https://docs.meteor.com/environment-variables.html#METEOR-SETTINGS
* https://docs.meteor.com/api/core.html#Meteor-settings
* https://blog.meteor.com/the-meteor-chef-making-use-of-settings-json-3ed5be2d0bad

*/
export const DataGeo = new Mongo.Collection('data_geo');

if (Meteor.isServer) {

  Meteor.publish('data_geo', function ({ body, bbox }) {
    console.log("Target queried: " + body);
    console.log("Bounds (raw): " + bbox);

    var cursor;
    if (bbox) {
      var west = bbox[0][0];
      west = west <= -180 ? -179.999 : west;
      var south = bbox[0][1];
      south = south <= -90 ? -89.999 : south;
      var east = bbox[1][0];
      east = east >= 180 ? 179.999 : east;
      var north = bbox[1][1];
      north = north >= 90 ? 89.999 : north;

      var boxPolygon = [
        [
          [west,south],
          [east,south],
          [east,north],
          [west,north],
          [west,south],
        ]
      ];
      console.log("Bounds (processed): " + boxPolygon);

      cursor = DataGeo.find({
        target_name: { $regex: new RegExp(body,"i") },
        geometry: {
          $geoIntersects: {
            $geometry: {
              type: "Polygon",
              coordinates: boxPolygon,
              // This MongoDB's "Big-Polygon" query feature
              crs: {
                type: "name",
                properties: { name: "urn:x-mongodb:crs:strictwinding:EPSG:4326" }
              }
            }
          }
        }
      });
    } else {
      cursor = DataGeo.find({ target_name: { $regex: new RegExp(body,"i") } });
    }
    return cursor;
  });

}
