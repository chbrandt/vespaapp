import React from 'react';
import { Session } from 'meteor/session';

/*
  Leaflet style, `leaflet.css`, is being loaded in <head />, wherever it is.

  All tentatives of loading it here, through js calls, failed.
  Apparently, there are solutions through webpack.conf hacks or plugins; E.g.:
  * https://github.com/ghybs/leaflet-defaulticon-compatibility.

  Also, for Meteor and React there are some third-party libs for Leaflet:
  * https://github.com/bevanhunt/meteor-leaflet;
  * https://github.com/PaulLeCam/react-leaflet;
  I am currently using the official one available through `npm`. The downside,
  again -- to make it clear --, for me using Meteor and React, is that the CSS
  has to be loaded in the `<head/>` element of `client/main.html` and (regarding
  React now) the map initialization has to be done in `componentDidMount`.
 */
import L from 'leaflet';

// Load basemaps and overlays definitions
import { baseMaps, overlayMaps } from './basemaps.js';

export default class Map extends React.Component {

  //FIXME: Still processing the data in UI component, make a wrapper for that!

  constructor(props) {
    super(props);

    this.state = {

      style: {
        height: props.style && props.style.height || '85vh'
      },

      featuresCount: {
        points: 0,
        lineStrings: 0,
        polygons: 0
      },

      featureIDs: {
        points: [],
        lineStrings: [],
        polygons: []
      },
    }
  }

  render() {
    return <div id="map" style={this.state.style}/>;
  }

  componentDidMount() {
    // Name of the body (planet, sattelite)
    const body = this.props.body;

    // TODO: read the map parameters from `basemap.js`.
    var map = L.map('map', {
                              center: [0, 0],
                              maxBounds:[[-90,-180],[90,180]],
                              zoom: 3,
                              // minZoom: 0.5,
                              // zoomSnap: 0.5,
                              // zoomDelta: 0.5,
                              // wheelPxPerZoomLevel:120
                            });

    // Load all basemaps for 'body', the last basemap loaded will be the default.
    var bm;
    var bmSet = {}
    baseMaps[body].forEach((pars) => {
      bm = new L.tileLayer(pars.url, pars.options);
      bmSet[pars.label] = bm;
    });
    bm.addTo(map);

    // Load the overlays for 'body', if any.
    var om;
    var omSet = {}
    if (overlayMaps[body]) {
      overlayMaps[body].forEach((pars) => {
        om = new L.tileLayer(pars.url, pars.options);
        omSet[pars.label] = om;
      })
      // om.addTo(map);
    }

    // Make the layers control (basemaps, overlays)
    L.control.layers(bmSet, omSet, {
      position: 'topright'
    }).addTo(map);

    /*
      Connect any map "move" event to the update of global 'bbox' variable.
      The 'bbox' variable is being watched by the connection with the MongoDB,
      at the App's sbuscription point to 'data_geo' Collection.
      (see App.js/withTracker())
      */
    map.on('moveend', (event) => {
      let bounds = map.getBounds();
      let bbox = [
        [bounds.getWest(), bounds.getSouth()],
        [bounds.getEast(), bounds.getNorth()]
      ];
      Session.set('bbox', bbox);
    });

    // L.control.mousePosition().addTo(map);
    // L.control.mapCenterCoord().addTo(map);

    // We will need the 'map' in other moments of the Component's life-cycle..
    this.map = map;
  }

  shouldComponentUpdate(newProps, newState) {
    var needUpdate = !(
      newProps.features.polygons.length === this.state.featuresCount.polygons
    )
    console.log(needUpdate);
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
      const objid = polygon._id.toString();
      if (polygonsIn.indexOf(objid) === -1) {
        var lonlat = polygon.s_region.coordinates;
        // Leaflet-Polygon doesn't like the first-and-last-points-repeated standard!
        var latlon = lonlat.map((coordArray) => {
          return coordArray.slice(0,-1).map((coord) => {
              return [coord[1],coord[0]] });
        });
        var marker = L.polygon(latlon);
        marker.bindPopup(renderPopup(polygon));
        marker.addTo(map);
        polygonsIn.push(objid);
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


function renderPopup2(item) {
  return function() {return '<p>{item.granule_uid}</p>';}
}

function renderPopup(item) {
  const link_datum = link_vespa_crism + sq + item.granule_uid + sq;
  const link_tool = '#'; //item.external_link;
  var infoTemplate = `
    <div className="list-group-item list-group-item-action">
      <div className="media" style="width:200px">
        <h6 className="media-heading"
            style="word-wrap:break-word;word-break:break-all; white-space:normal !important">{granule_uid}
        </h6>
        <div>
          <div className="media-left media-middle" style="display:inline">
            <a href={thumbnail_url} target="_blank">
              <img className="media-object" style="height:30px;width:30px"
                   src={thumbnail_url} alt=""/>
            </a>
          </div>
          <span>
          <div className="media-body" style="display:inline">
            <strong>Lon, Lat:</strong> {lon}, {lat}
          </div>
          </span>
        </div>
      </div>
    </div>
    `;
    // var infoElement = L.Util.template(infoTemplate, {granule_uid:item.granule_uid, thumbnail_url:item.thumbnail_url, link_tool:link_tool, link_datum:link_datum});
    var infoElement = L.Util.template(infoTemplate, {granule_uid:item.granule_uid, thumbnail_url:item.thumbnail_url, lon:item.c1min, lat:item.c2min, link_tool:link_tool, link_datum:link_datum});
    return infoElement;
}
const link_vespa_crism = 'http://vespa.obspm.fr/planetary/data/display/?f-url_op=&f-schema_op=&f-target_name=&f-instrument_host_name=&f-instrument_name_op=%3D&f-instrument_name=&f-processing_level=&f-time_search_type_op=is_included_in&f-time_interval_type_op=between&f-time_min=&f-time_max=&f-time_center=&f-time_delta_value_op=&f-time_exp_min_op=%3E%3D&f-time_exp_min=&f-time_exp_max_op=%3C%3D&f-time_exp_max=&f-time_sampling_step_min_op=%3E%3D&f-time_sampling_step_min=&f-time_sampling_step_max_op=%3C%3D&f-time_sampling_step_max=&f-spatial_frame_type=&f-location_interval_op=intersection&f-location_values_op=between&f-c1min=&f-c1max=&f-c1center=&f-c1delta=&f-c2min=&f-c2max=&f-c2center=&f-c2delta=&f-c3min=&f-c3max=&f-c3center=&f-c3delta=&f-c1_resol_min=&f-c1_resol_max=&f-c1_resol_center=&f-c1_resol_delta=&f-c2_resol_min=&f-c2_resol_max=&f-c2_resol_center=&f-c2_resol_delta=&f-c3_resol_min=&f-c3_resol_max=&f-c3_resol_center=&f-c3_resol_delta=&f-spectral_interval_op=intersection&f-spectral_unit_op=hertz&f-spectral_range_min=&f-spectral_range_max=&f-spectral_resolution_min=&f-spectral_resolution_max=&f-spectral_sampling_step_min=&f-spectral_sampling_step_max=&f-phase_min_op=%3E%3D&f-phase_min=&f-phase_max_op=%3C%3D&f-phase_max=&f-incidence_min_op=%3E%3D&f-incidence_min=&f-incidence_max_op=%3C%3D&f-incidence_max=&f-emergence_min_op=%3E%3D&f-emergence_min=&f-emergence_max_op=%3C%3D&f-emergence_max=&f-granule_uid=&f-granule_gid=&f-obs_id=&f-measurement_type=&f-species=&f-feature_name=&resource_id=ivo%3A%2F%2Fjacobsuni%2Fcrism%2Fq%2Fepn_core&services=form_registered_services&query_source=text&f-text_query=granule_uid%3D'
const sq = '%27'
const image_icon = 'https://camo.githubusercontent.com/f8ea5eab7494f955e90f60abc1d13f2ce2c2e540/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f323037383234352f3235393331332f35653833313336322d386362612d313165322d383435332d6536626439353663383961342e706e67'
