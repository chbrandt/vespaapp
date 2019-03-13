import { Meteor } from 'meteor/meteor';
import React from 'react';

import { create_vespa_link, thumbnail_empty } from './links_ext.js';


export default class Granule extends React.Component {
  /*
  Represent an EPN-TAP _granule_ (i.e., Table record) in a UI/React interface.
  It is primary meant to be used in a list of items (ListGranules).
  This component expects to receive `props` with the following fields:
  - data:
    - granule_uid
    - identifier
    - thumbnail_url
    - external_url
  - onItemClicked: callback to run when item is clicked.
  */

  constructor(props) {
    super(props);

    // callbacks
    this.onItemClicked = this.props.onItemClicked || function() {console.log("not defined")};
    // internal bindings
    // this.itemClicked = this.itemClicked.bind(this);
  }

  render() {
    const schema = this.props.data.service_schema;
    const thumbnail_url = this.props.data.thumbnail_url;
    const granule_uid = this.props.data.granule_uid;
    const ivo_id = this.props.data.service_identifier;
    const external_url = this.props.data.external_url;
    const title = this.props.data.service_title;

    const link_vespa = ivo_id ? create_vespa_link(granule_uid, ivo_id) : undefined;

    const target_name = this.props.data.target_name.replace(/^\w/, c => c.toUpperCase());

    return (
      <div style={this.props.style} className="list-group-item">

        <div className="media" style={{whiteSpace:'nowrap', overflow:'hidden', minWidth:'200px'}}>

          <div className="media-heading">
            <h4 style={{whiteSpace:'nowrap', overflow:'hidden', minWidth:'50px', textOverflow:'ellipsis'}}>
              <abbr title={title}>{schema}</abbr><small>{" : "+granule_uid}</small>
            </h4>
          </div>

          <div className="media-left media-middle">
            <Thumbnail url={thumbnail_url} />
          </div>

          <span className="media-body media-middle">
            <ul>
              <li>{"object: "+target_name}</li>
              <li>{"service: "+this.props.data.service_title}</li>
              <li>{"datatype: "+this.props.data.dataproduct_type}</li>
            </ul>
          </span>

          <span className="media-right media-middle">
            <Links link_vespa={link_vespa} link_tool={external_url} />
          </span>
        </div>
      </div>
    );
  }
}


function Thumbnail({ url }) {
  /*
    Return a clickable thumbnail
  */
  const thumbnail = url || thumbnail_empty;
  //FIXME: this <a/> element is ugly, we should use a 'modal' widget here!
  return (
      <a className="media-object" href={thumbnail} target="_blank">
        <img style={{height:'60px'}}
              src={thumbnail} alt="" />
      </a>
  );
}


function Links({ link_vespa, link_tool , style}) {
  /*
    Return a vertical arrangement of links to external URLs
  */
  console.log("link-vespa"+link_vespa);
  return (
    <div className="well well-sm">

      <a href={link_vespa} target="_blank" style={{display:"block"}}>
        <div className="glyphicon glyphicon-new-window"/>
      </a>

      <hr style={{height:'5px', border:0, display:'block', padding:0, margin:0}}/>

      <a href={link_tool} target="_blank" style={{display:"block"}}>
        <div className="glyphicon glyphicon-wrench"/>
      </a>

    </div>
  );
}
