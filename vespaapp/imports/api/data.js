import { Mongo } from 'meteor/mongo';

export const Mars = new Mongo.Collection('mars');

if (Meteor.isServer) {
  Meteor.publish('mars', function dataPublication({ mapBounds }) {
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
      // console.log(boxPolygon);
      cursor = Mars.find({
        // geometry: { $geoWithin: { $box: mapBounds }}
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
      cursor = Mars.find({});
    }
    return cursor;
  });
}
