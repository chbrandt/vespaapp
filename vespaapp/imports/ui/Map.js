import React from 'react';
import { Session } from 'meteor/session';

// import {points} from '../data/mars.js';

import L from 'leaflet';
require('leaflet/dist/leaflet.css');

var mapGlobal = {};

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div id="map" className="container"></div>;
  }

  componentDidMount() {
    /* NOTE
      From 'https://reactjs.org/docs/react-component.html#componentdidmount':
        You may call setState() immediately in componentDidMount().
        It will trigger an extra rendering, but it will happen before the
        browser updates the screen. (...) It can, however, be necessary for
        cases like modals and tooltips when you need to measure a DOM node
        before rendering something that depends on its size or position.
    */

    // create map
    this.map = L.map('map', {
                              center: [0, 180],
                              maxBounds:[[-90,0],[90,360]],
                              zoom: 3,
                              minZoom: 1
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
    basemapOPMVector.addTo(this.map);

    // points.slice(0,3).forEach((point,i) => {
    //   var lonlat = point.location;
    //   var marker = L.marker([lonlat[1],lonlat[0]], {color:'red'}).addTo(this.map);
    //   alert('Marker:' + marker);
    // })

    // Events
    this.map.on('moveend', (event) => {
      let bounds = this.map.getBounds();
      let bbox = [
        [bounds.getWest(), bounds.getSouth()],
        [bounds.getEast(), bounds.getNorth()]
      ];
      Session.set('mapBounds', bbox);
    });

    mapGlobal.map = this.map;
  }
}
export default Map;

// This is not being used now, but I want to keep it here because my memory
export function mapCallback() {
  if(mapGlobal.map) {
    alert("Check Map obj: " + mapGlobal.map.getBounds().toBBoxString());
  }
}
