import { Mongo } from 'meteor/mongo';

export const Mars = new Mongo.Collection('mars');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('mars', function dataPublication({ mapBounds }) {
    if (mapBounds) {
      console.log('Bounds: ' + mapBounds);
      var west = mapBounds[0][0];
      var south = mapBounds[0][1];
      var east = mapBounds[1][0];
      var north = mapBounds[1][1];
      var boxPolygon = [
        [
          [west,south],
          [east,south],
          [east,north],
          [west,north],
          [west,south],
        ]
      ];
      console.log('Bounds: ' + boxPolygon);
      return Mars.find({
        // geometry: { $geoWithin: { $box: mapBounds }}
        geometry: {
          $geoIntersects: {
            $geometry: {
              type: "Polygon",
              coordinates: boxPolygon
            }
          }
        }
      });
    }
    return Mars.find({});
  });
}
