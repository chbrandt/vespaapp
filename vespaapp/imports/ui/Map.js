import React from 'react';
import { Session } from 'meteor/session';

// import {points} from '../data/mars.js';

import 'leaflet';
import ReactLeaflet from 'react-leaflet';
// require('leaflet/dist/leaflet.css');

var mapGlobal = {};

const { Map: LeafletMap, TileLayer, Marker, Popup } = ReactLeaflet;

class Mapp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
      zoom:3
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <LeafletMap center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution = '<a href="https://github.com/openplanetary/opm/wiki" target="_blank">OpenPlanetary</a>'
          url = 'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-1/0,1,2,3,4/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </LeafletMap>
    );
  }

  // componentDidMount() {
  //   /* NOTE
  //     From 'https://reactjs.org/docs/react-component.html#componentdidmount':
  //       You may call setState() immediately in componentDidMount().
  //       It will trigger an extra rendering, but it will happen before the
  //       browser updates the screen. (...) It can, however, be necessary for
  //       cases like modals and tooltips when you need to measure a DOM node
  //       before rendering something that depends on its size or position.
  //   */
  //
  //   // create map
  //   var map = L.map('map', {
  //                             center: [0, 180],
  //                             maxBounds:[[-90,0],[90,360]],
  //                             zoom: 3,
  //                             minZoom: 1
  //                           });
  //
  //   // OpenPlanetary citation
  //   const basemap_Mars_attribution = '<a href="https://github.com/openplanetary/opm/wiki" target="_blank">OpenPlanetary</a>'
  //
  //   // Plain basemap
  //   const basemap_plain = 'https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-1/0,1,2,3,4/{z}/{x}/{y}.png'
  //   const basemapOPMVector = new L.tileLayer(basemap_plain,
  //                                            {maxNativeZoom: 9,
  //                                             zoom: 3,
  //                                             tms: false,
  //                                             autoZIndex: true,
  //                                             attribution: basemap_Mars_attribution}
  //                                           );
  //   basemapOPMVector.addTo(map);
  //
  //   // Events
  //   map.on('moveend', (event) => {
  //     let bounds = map.getBounds();
  //     let bbox = [
  //       [bounds.getWest(), bounds.getSouth()],
  //       [bounds.getEast(), bounds.getNorth()]
  //     ];
  //     Session.set('mapBounds', bbox);
  //   });
  //
  //   var mrk = new L.marker([0,180]);
  //   mrk.addTo(map);
  //
  //   mapGlobal.map = map;
  // }
}
export default Mapp;




// const { Map: LeafletMap, TileLayer, Marker, Popup } = ReactLeaflet;
//
// class SimpleExample extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       lat: 51.505,
//       lng: -0.09,
//       zoom: 13
//     };
//   }
//
//   render() {
//     const position = [this.state.lat, this.state.lng];
//     return (
//       <LeafletMap center={position} zoom={this.state.zoom}>
//         <TileLayer
//           attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
//           url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={position}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       </LeafletMap>
//     );
//   }
// }
//
// ReactDOM.render(<SimpleExample />, document.getElementById("container"));
