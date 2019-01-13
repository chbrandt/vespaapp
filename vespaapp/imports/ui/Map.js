import React from 'react';
import { Session } from 'meteor/session';

import L from 'leaflet';

const basemaps = {
  attribution: '<a href="https://github.com/openplanetary/opm/wiki" target="_blank"> OpenPlanetary </a>',
  mars: [
    {
      url: 'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-1/0,1,2,3,4/{z}/{x}/{y}.png',
      tms: false,
    },
  ],
  moon: [],
}

class Map extends React.Component {
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

    const defaultMapSettings = basemaps[this.props.body][0];
    const defaultMap = new L.tileLayer(defaultMapSettings.url,
                                        {maxNativeZoom: 9,
                                         zoom: 3,
                                         tms: defaultMapSettings.tms,
                                         autoZIndex: true,
                                         attribution: basemaps.attribution}
    );
    defaultMap.addTo(map);

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
      newProps.features.points.length === this.state.featuresCount.points &&
      newProps.features.lineStrings.length === this.state.featuresCount.lineStrings &&
      newProps.features.polygons.length === this.state.featuresCount.polygons
    )
    return needUpdate;
  }

  componentDidUpdate(props) {
    var map = this.map;

    var cntPoints = 0;
    var pointsIn = this.state.featureIDs.points;
    this.props.features.points.forEach((point,i) => {
      if (pointsIn.indexOf(point.id) === -1) {
        var lonlat = point.geometry.coordinates;
        var marker = L.marker([lonlat[1],lonlat[0]], {
          title: point.name,
        });
        marker.bindPopup(point.name);
        marker.addTo(map);
        pointsIn.push(point.id);
      }
    });
    cntPoints = this.props.features.points.length;

    var cntLineStrings = 0;
    var linesIn = this.state.featureIDs.lineStrings;
    this.props.features.lineStrings.forEach((line,i) => {
      if (linesIn.indexOf(line.id) === -1) {
        var lonlat = line.geometry.coordinates;
        var latlon = lonlat.map((coord) => { return [coord[1],coord[0]]})
        var marker = L.polyline(latlon);
        marker.bindPopup(line.name);
        marker.addTo(map);
        linesIn.push(line.id);
      }
    });
    cntLineStrings = this.props.features.lineStrings.length;

    var cntPolygons = 0;
    var polygonsIn = this.state.featureIDs.polygons;
    this.props.features.polygons.forEach((polygon,i) => {
      if (polygonsIn.indexOf(polygon.id) === -1) {
        var lonlat = polygon.geometry.coordinates;
        // Leaflet-Polygon doesn't like the first-and-last-points-repeated standard!
        var latlon = lonlat.map((coordArray) => {
          return coordArray.slice(0,-1).map((coord) => {
              return [coord[1],coord[0]] });
        });
        var marker = L.polygon(latlon);
        marker.bindPopup(polygon.name);
        marker.addTo(map);
        polygonsIn.push(polygon.id);
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
export default Map;
