import React from 'react';

import L from 'leaflet';
require('leaflet/dist/leaflet.css');

class Map extends React.Component {
  render() {
    return <div id="map"></div>;
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
  }
}
export default Map;