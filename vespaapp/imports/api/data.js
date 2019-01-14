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
const data_collection_name = Meteor.settings.public.db.collections.data;
console.log("Data collection name: " + data_collection_name);

export const Data = new Mongo.Collection(data_collection_name);

if (Meteor.isServer) {
  console.log("Collection being published: " + data_collection_name);

  Meteor.publish(data_collection_name, function dataPublication({ body, mapBounds }) {
    console.log("Target queried: " + body);
    console.log("Bounds (raw): " + mapBounds);

    var cursor;
    if (mapBounds) {
      var west = mapBounds[0][0];
      west = west <= -180 ? -179.999 : west;
      var south = mapBounds[0][1];
      south = south <= -90 ? -89.999 : south;
      var east = mapBounds[1][0];
      east = east >= 180 ? 179.999 : east;
      var north = mapBounds[1][1];
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

      cursor = Data.find({
        target: body,
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
      cursor = Data.find({ target:body });
    }
    return cursor;
  });
}
