import { Meteor } from 'meteor/meteor';
import React from 'react';


export default class DataItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: props.isSaved
    }
  this.itemClicked = this.itemClicked.bind(this);
  }

  render() {
    const thumbnail_url = this.props.data.thumbnail_url;
    const granule_uid = this.props.data.granule_uid;
    const ivo_id = this.props.data.identifier;

    return (
      <button type="button" className="list-group-item list-group-item-action" onClick={this.itemClicked}>
        <div className="media">
          <div className="media-left media-middle">
            <Thumbnail url={thumbnail_url} />
          </div>
          <div className="media-body">
            <Tools granule_uid={granule_uid} identifier={ivo_id} />
            <h4 className="media-heading" style={{wordWrap:'break-word', wordBreak:'break-all', whiteSpace:'normal !important'}}>
              {granule_uid}
            </h4>
          </div>
        </div>
      </button>
    );
  }

  itemClicked() {
    // alert(String(this.props.data.name) + ": I was clicked!");
  }

  // toggleSaved() {
  //   const noteId = Meteor.user().username + this.props.data.name;
  //   const target = this.props.target;
  //   if (! this.state.saved) {
  //     Meteor.call('notes.insert', { noteId, target });
  //   } else {
  //     Meteor.call('notes.remove', noteId);
  //   }
  //
  //   this.setState({
  //     saved: ! this.state.saved
  //   });
  // }
}

function Thumbnail({ url }) {
  const thumbnail = url || image_icon;
  return (
      <a href={thumbnail} target="_blank">
        <img className="media-object" style={{height:'60px'}}
              src={thumbnail} alt="" />
      </a>
  );
}

function Tools({ granule_uid, identifier, link_tool }) {
  const link_datum = identifier ? create_vespa_link(granule_uid, identifier) : undefined;
  return (
    <div className="well well-sm" style={{float:'right'}}>
      <a href={link_datum} target="_blank" style={{display:"block"}}>
        <div className="glyphicon glyphicon-new-window"/>
      </a>
      <hr style={{height:'5px', border:0, display:'block', padding:0, margin:0}}/>
      <a href={link_tool} target="_blank" style={{display:"block"}}>
        <div className="glyphicon glyphicon-wrench"/>
      </a>
    </div>
  );
}

function create_vespa_link(granule_uid, identifier) {
  const vespaURL = 'http://vespa.obspm.fr/planetary/data/display/?f-url_op=&f-schema_op=&f-target_name=&f-instrument_host_name=&f-instrument_name_op=%3D&f-instrument_name=&f-processing_level=&f-time_search_type_op=is_included_in&f-time_interval_type_op=between&f-time_min=&f-time_max=&f-time_center=&f-time_delta_value_op=&f-time_exp_min_op=%3E%3D&f-time_exp_min=&f-time_exp_max_op=%3C%3D&f-time_exp_max=&f-time_sampling_step_min_op=%3E%3D&f-time_sampling_step_min=&f-time_sampling_step_max_op=%3C%3D&f-time_sampling_step_max=&f-spatial_frame_type=&f-location_interval_op=intersection&f-location_values_op=between&f-c1min=&f-c1max=&f-c1center=&f-c1delta=&f-c2min=&f-c2max=&f-c2center=&f-c2delta=&f-c3min=&f-c3max=&f-c3center=&f-c3delta=&f-c1_resol_min=&f-c1_resol_max=&f-c1_resol_center=&f-c1_resol_delta=&f-c2_resol_min=&f-c2_resol_max=&f-c2_resol_center=&f-c2_resol_delta=&f-c3_resol_min=&f-c3_resol_max=&f-c3_resol_center=&f-c3_resol_delta=&f-spectral_interval_op=intersection&f-spectral_unit_op=hertz&f-spectral_range_min=&f-spectral_range_max=&f-spectral_resolution_min=&f-spectral_resolution_max=&f-spectral_sampling_step_min=&f-spectral_sampling_step_max=&f-phase_min_op=%3E%3D&f-phase_min=&f-phase_max_op=%3C%3D&f-phase_max=&f-incidence_min_op=%3E%3D&f-incidence_min=&f-incidence_max_op=%3C%3D&f-incidence_max=&f-emergence_min_op=%3E%3D&f-emergence_min=&f-emergence_max_op=%3C%3D&f-emergence_max=&f-granule_uid=&f-granule_gid=&f-obs_id=&f-measurement_type=&f-species=&f-feature_name=&services=form_registered_services&query_source=text&'
  const serviceTerm = '&resource_id=' + encodeURI(identifier);
  const granuleTerm = 'f-text_query=granule_uid%3D' + encodeURI("'"+granule_uid+"'");

  return vespaURL + serviceTerm + granuleTerm;
}

const image_icon = 'https://camo.githubusercontent.com/f8ea5eab7494f955e90f60abc1d13f2ce2c2e540/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f323037383234352f3235393331332f35653833313336322d386362612d313165322d383435332d6536626439353663383961342e706e67'
