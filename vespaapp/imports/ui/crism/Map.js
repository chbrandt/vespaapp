import React from 'react';
import { Session } from 'meteor/session';

import L from 'leaflet';

import { baseMaps, overlayMaps } from '../basemaps.js';

class MapCrism extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featuresCount: {
        points: 0,
        lineStrings: 0,
        polygons: 0
      },
      featureIDs: {
        points: [],
        lineStrings: [],
        polygons: []
      }
    }
  }

  render() {
    return <div id="map" className="col-9"></div>;
  }

  componentDidMount() {
    // create map
    var map = L.map('map', {
                              center: [0, 0],
                              maxBounds:[[-90,-180],[90,180]],
                              zoom: 2,
                              minZoom: 1,
                            });

    var bm;
    var bmSet = {}
    baseMaps['mars'].forEach((pars) => {
      bm = new L.tileLayer(pars.url, pars.options);
      bmSet[pars.label] = bm;
    });

    var om;
    var omSet = {}
    overlayMaps['mars'].forEach((pars) => {
      om = new L.tileLayer(pars.url, pars.options);
      omSet[pars.label] = om;
    })

    L.control.layers(bmSet, omSet, {
      position: 'topright'
    }).addTo(map);

    bm.addTo(map);
    om.addTo(map);

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

  shouldComponentUpdate(newProps, newState) {
    var needUpdate = !(
      newProps.features.polygons.length === this.state.featuresCount.polygons
    )
    return needUpdate;
  }

  componentDidUpdate(props) {
    var map = this.map;

    var cntPoints = 0;
    var pointsIn = this.state.featureIDs.points;

    var cntLineStrings = 0;
    var linesIn = this.state.featureIDs.lineStrings;

    var cntPolygons = 0;
    var polygonsIn = this.state.featureIDs.polygons;
    this.props.features.polygons.forEach((polygon,i) => {
      if (polygonsIn.indexOf(polygon.obs_id) === -1) {
        var lonlat = polygon.geometry.coordinates;
        // Leaflet-Polygon doesn't like the first-and-last-points-repeated standard!
        var latlon = lonlat.map((coordArray) => {
          return coordArray.slice(0,-1).map((coord) => {
              return [coord[1],coord[0]] });
        });
        var marker = L.polygon(latlon);
        marker.bindPopup(polygon.target_name);
        marker.addTo(map);
        polygonsIn.push(polygon.obs_id);
      }
    });
    cntPolygons = this.props.features.polygons.length;

    this.setState({
      featuresCount: {
        points: cntPoints,
        lineStrings: cntLineStrings,
        polygons: cntPolygons
      },
      featuresIDs: {
        points: pointsIn,
        lineStrings: linesIn,
        polygons: polygonsIn
      }
    });
    // alert("Number of features: " + cntPoints + "," + cntLineStrings + "," + cntPolygons);
    console.log("Number of features: " + this.state.featuresCount.points
                                 + "," + this.state.featuresCount.lineStrings
                                 + "," + this.state.featuresCount.polygons);

  }
}
export default MapCrism;
