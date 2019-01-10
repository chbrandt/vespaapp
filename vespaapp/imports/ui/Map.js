import React from 'react';
import { Session } from 'meteor/session';

import L from 'leaflet';

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div id="map" className="container"></div>;
  }

  componentDidMount() {
    // create map
    var map = L.map('map', {
                              center: [0, 0],
                              maxBounds:[[-90,-180],[90,180]],
                              zoom: 2,
                              minZoom: 1,
                            });

    // OpenPlanetary citation
    const basemap_Mars_attribution = '<a href="https://github.com/openplanetary/opm/wiki" target="_blank">OpenPlanetary</a>'

    // Plain basemap
    const basemap_plain = 'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-1/0,1,2,3,4/{z}/{x}/{y}.png'
    const basemapOPMVector = new L.tileLayer(basemap_plain,
                                             {maxNativeZoom: 9,
                                              zoom: 3,
                                              tms: false,
                                              autoZIndex: true,
                                              attribution: basemap_Mars_attribution}
                                            );
    basemapOPMVector.addTo(map);

    // points.forEach((point,i) => {
    //   var lonlat = point.location;
    //   var marker = L.marker([lonlat[1],lonlat[0]], {
    //     title: point.name,
    //   });
    //   marker.addTo(map);
    // });
    //
    // lines.forEach((line,i) => {
    //   var lonlat = line.location;
    //   var latlon = lonlat.map((coord) => { return [coord[1],coord[0]]})
    //   var marker = L.polyline(latlon);
    //   marker.addTo(map);
    // });
    //
    // polygons.forEach((polygon,i) => {
    //   var lonlat = polygon.location;
    //   // Leaflet-Polygon doesn't like the first-and-last-points-repeated standard!
    //   var latlon = lonlat.map((coordArray) => {
    //     return coordArray.slice(0,-1).map((coord) => {
    //         return [coord[1],coord[0]] });
    //   });
    //   var marker = L.polygon(latlon);
    //   marker.addTo(map);
    // });

    // Events
    map.on('moveend', (event) => {
      let bounds = map.getBounds();
      let bbox = [
        [bounds.getWest(), bounds.getSouth()],
        [bounds.getEast(), bounds.getNorth()]
      ];
      Session.set('mapBounds', bbox);
    });

    this.map = map;
  }

  componentDidUpdate(props) {
    var map = this.map;

    this.props.features.points.forEach((point,i) => {
      var lonlat = point.geometry.coordinates;
      var marker = L.marker([lonlat[1],lonlat[0]], {
        title: point.name,
      });
      marker.addTo(map);
    });

    this.props.features.lineStrings.forEach((line,i) => {
      var lonlat = line.geometry.coordinates;
      var latlon = lonlat.map((coord) => { return [coord[1],coord[0]]})
      var marker = L.polyline(latlon);
      marker.addTo(map);
    });

    this.props.features.polygons.forEach((polygon,i) => {
      var lonlat = polygon.geometry.coordinates;
      // Leaflet-Polygon doesn't like the first-and-last-points-repeated standard!
      var latlon = lonlat.map((coordArray) => {
        return coordArray.slice(0,-1).map((coord) => {
            return [coord[1],coord[0]] });
      });
      var marker = L.polygon(latlon);
      marker.addTo(map);
    });
  }
}
export default Map;
