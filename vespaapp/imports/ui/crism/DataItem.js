import { Meteor } from 'meteor/meteor';
import React from 'react';

// import { Notes } from '../api/notes.js';

const image_icon = 'https://camo.githubusercontent.com/f8ea5eab7494f955e90f60abc1d13f2ce2c2e540/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f323037383234352f3235393331332f35653833313336322d386362612d313165322d383435332d6536626439353663383961342e706e67'

'http://vespa.obspm.fr/planetary/data/display/?resource_id=ivo://jacobsuni/crism/q/epn_core'

const link_vespa_crism = 'http://vespa.obspm.fr/planetary/data/display/?f-url_op=&f-schema_op=&f-target_name=&f-instrument_host_name=&f-instrument_name_op=%3D&f-instrument_name=&f-processing_level=&f-time_search_type_op=is_included_in&f-time_interval_type_op=between&f-time_min=&f-time_max=&f-time_center=&f-time_delta_value_op=&f-time_exp_min_op=%3E%3D&f-time_exp_min=&f-time_exp_max_op=%3C%3D&f-time_exp_max=&f-time_sampling_step_min_op=%3E%3D&f-time_sampling_step_min=&f-time_sampling_step_max_op=%3C%3D&f-time_sampling_step_max=&f-spatial_frame_type=&f-location_interval_op=intersection&f-location_values_op=between&f-c1min=&f-c1max=&f-c1center=&f-c1delta=&f-c2min=&f-c2max=&f-c2center=&f-c2delta=&f-c3min=&f-c3max=&f-c3center=&f-c3delta=&f-c1_resol_min=&f-c1_resol_max=&f-c1_resol_center=&f-c1_resol_delta=&f-c2_resol_min=&f-c2_resol_max=&f-c2_resol_center=&f-c2_resol_delta=&f-c3_resol_min=&f-c3_resol_max=&f-c3_resol_center=&f-c3_resol_delta=&f-spectral_interval_op=intersection&f-spectral_unit_op=hertz&f-spectral_range_min=&f-spectral_range_max=&f-spectral_resolution_min=&f-spectral_resolution_max=&f-spectral_sampling_step_min=&f-spectral_sampling_step_max=&f-phase_min_op=%3E%3D&f-phase_min=&f-phase_max_op=%3C%3D&f-phase_max=&f-incidence_min_op=%3E%3D&f-incidence_min=&f-incidence_max_op=%3C%3D&f-incidence_max=&f-emergence_min_op=%3E%3D&f-emergence_min=&f-emergence_max_op=%3C%3D&f-emergence_max=&f-granule_uid=&f-granule_gid=&f-obs_id=&f-measurement_type=&f-species=&f-feature_name=&resource_id=ivo%3A%2F%2Fjacobsuni%2Fcrism%2Fq%2Fepn_core&services=form_registered_services&query_source=text&f-text_query=granule_uid%3D'
const sq = '%27'


class DataItemCrism extends React.Component {
  constructor(props) {
    super(props);
    /*
    Props are expected to be:
    - key
      -
    - id
      - granule_uid
      - granule_gid
      - obs_id
    - thumbnail
      - thumbnail_url
    - body
      - target_name
    - bbox
      - c1min
      - c1max
      - c2min
      - c2max
    - geometry
      - s_region
    - reference
      - bib_reference
    */
    this.state = {
      saved: props.isSaved
    }
  }

  render() {
    const link_datum = link_vespa_crism + sq + this.props.data.granule_uid + sq;
    return (
      <div className="list-group-item list-group-item-action">
          {/*<img src={this.props.data.thumbnail_url} style={{width:'50px'}}/>*/}
          <div>
            <img src={image_icon} style={{width:'50px'}}/>
            <a href={link_datum} target="_blank"
               className="card-body"
               style={{height:'30px', float:'right'}}>
              <div className="glyphicon glyphicon-share"/>
            </a>
          </div>
          <p className="item-name">{this.props.data.granule_uid}</p>
      </div>
    );
  }

  toggleSaved() {
    const noteId = Meteor.user().username + this.props.data.name;
    const target = this.props.target;
    if (! this.state.saved) {
      Meteor.call('notes.insert', { noteId, target });
    } else {
      Meteor.call('notes.remove', noteId);
    }

    this.setState({
      saved: ! this.state.saved
    });
  }
}
export default DataItemCrism;
