import { Mongo } from 'meteor/mongo';

export const Data = new Mongo.Collection('mdb');
// export const Items = new Mongo.Collection('items');

if (Meteor.isServer) {
  // Meteor.publish('items', function dataPublication({ body, mapBounds }) {
  Meteor.publish('mdb', function dataPublication({ body, mapBounds }) {
    console.log(body);
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
      cursor = Data.find({
        target: body,
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
      cursor = Data.find({target:body});
    }
    return cursor;
  });
}
